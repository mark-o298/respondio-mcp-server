import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { createServer } from "../server.js";
import { tokenVerifier } from "../middlewares/TokenVerifier.js";
import { BaseProtocol } from "./BaseProtocol.js";
import path from "path";
export class HttpStreamProtocol extends BaseProtocol {
    options;
    app;
    httpServer;
    transport;
    closing = false;
    sessions = new Map();
    port;
    apiBaseUrl;
    debug;
    constructor(options) {
        super();
        this.options = options;
        this.port = options.port;
        this.apiBaseUrl = options.apiBaseUrl;
        this.debug = options.debug;
    }
    init() {
        if (this.httpServer) {
            return Promise.resolve({
                app: this.app,
                httpServer: this.httpServer,
                transport: this.transport,
                close: this.close.bind(this),
                port: this.port,
            });
        }
        const app = this.options.app ?? express();
        app.use(express.json());
        app.use(express.static(this.options.staticDir ?? path.join(process.cwd(), "public")));
        const corsOptions = {
            origin: this.options.corsOrigin ?? true,
            methods: "*",
            allowedHeaders: this.options.allowedHeaders ??
                "Authorization, Origin, Content-Type, Accept, Mcp-Session-Id, *",
            exposedHeaders: ["Mcp-Session-Id"],
        };
        app.use(cors(corsOptions));
        app.options("/mcp", cors(corsOptions));
        app.get("/health", (_req, res) => {
            res.status(200).json({ status: "ok" });
        });
        app.use("/mcp", tokenVerifier);
        app.all("/mcp", async (req, res) => {
            const parsedBody = req.method === "POST" ? req.body : undefined;
            const sessionHeader = req.headers["mcp-session-id"];
            const sessionId = typeof sessionHeader === "string"
                ? sessionHeader
                : Array.isArray(sessionHeader)
                    ? sessionHeader[0]
                    : undefined;
            // WARNING: Logging request body may expose sensitive data in production
            if (process.env.DEBUG) {
                console.error(`Received ${req.method} MCP request:`, parsedBody);
            }
            let session = sessionId ? this.sessions.get(sessionId) : undefined;
            let createdSession;
            let initializedSessionId;
            try {
                const isInitRequest = req.method === "POST" &&
                    parsedBody !== undefined &&
                    (Array.isArray(parsedBody)
                        ? parsedBody.some((message) => isInitializeRequest(message))
                        : isInitializeRequest(parsedBody));
                if (!session) {
                    if (!sessionId && isInitRequest) {
                        const { server } = createServer({
                            apiBaseUrl: this.apiBaseUrl,
                            debug: this.debug,
                            mode: "http",
                        });
                        const transport = new StreamableHTTPServerTransport({
                            sessionIdGenerator: this.options.sessionIdGenerator ?? (() => randomUUID()),
                            onsessioninitialized: (newSessionId) => {
                                initializedSessionId = newSessionId;
                                this.sessions.set(newSessionId, { transport, server });
                            },
                        });
                        transport.onclose = () => {
                            const sid = transport.sessionId;
                            if (!sid) {
                                return;
                            }
                            const activeSession = this.sessions.get(sid);
                            if (!activeSession || activeSession.transport !== transport) {
                                return;
                            }
                            this.sessions.delete(sid);
                            transport.onclose = undefined;
                            void activeSession.server
                                .close()
                                .catch((error) => console.error(`Error closing server for session ${sid}:`, error));
                        };
                        await server.connect(transport);
                        session = { transport, server };
                        createdSession = session;
                        if (!this.transport) {
                            this.transport = transport;
                        }
                    }
                    else {
                        res.status(400).json({
                            jsonrpc: "2.0",
                            error: {
                                code: -32000,
                                message: "Bad Request: No valid session ID provided",
                            },
                            id: null,
                        });
                        return;
                    }
                }
                await session.transport.handleRequest(req, res, parsedBody);
                if (createdSession && !initializedSessionId) {
                    await createdSession.transport.close().catch((error) => {
                        console.error("Error closing uninitialized transport:", error);
                    });
                    await createdSession.server.close().catch((error) => {
                        console.error("Error closing uninitialized server:", error);
                    });
                }
            }
            catch (error) {
                console.error("Error handling MCP request:", error);
                if (createdSession) {
                    if (initializedSessionId) {
                        this.sessions.delete(initializedSessionId);
                    }
                    await createdSession.transport.close().catch((closeError) => {
                        console.error("Error closing transport after request failure:", closeError);
                    });
                    await createdSession.server.close().catch((closeError) => {
                        console.error("Error closing server after request failure:", closeError);
                    });
                }
                if (!res.headersSent) {
                    res.status(500).json({
                        jsonrpc: "2.0",
                        error: {
                            code: -32603,
                            message: "Internal server error",
                        },
                        id: null,
                    });
                }
            }
        });
        const httpServer = app.listen(this.port, () => {
            console.error(`MCP Streamable HTTP Server listening on port ${this.port}`);
        });
        const onSigInt = async () => {
            console.error("Shutting down server...");
            await this.close().catch((err) => console.error("Error during shutdown:", err));
            process.exit(0);
        };
        process.on("SIGINT", () => void onSigInt());
        process.on("SIGTERM", () => void onSigInt());
        this.app = app;
        this.httpServer = httpServer;
        return Promise.resolve({
            app,
            httpServer,
            transport: this.transport,
            close: this.close.bind(this),
            port: this.port,
        });
    }
    async close() {
        if (this.closing) {
            return;
        }
        this.closing = true;
        for (const [sessionId, session] of this.sessions.entries()) {
            this.sessions.delete(sessionId);
            try {
                console.error(`Closing transport for session ${sessionId}`);
                session.transport.onclose = undefined;
                await session.transport.close();
            }
            catch (error) {
                console.error(`Error closing transport for session ${sessionId}:`, error);
            }
            try {
                await session.server.close();
            }
            catch (error) {
                console.error(`Error closing server for session ${sessionId}:`, error);
            }
        }
        if (!this.httpServer) {
            return;
        }
        await new Promise((resolve, reject) => {
            this.httpServer.close((err) => (err ? reject(err) : resolve()));
        });
        this.httpServer = undefined;
    }
}
//# sourceMappingURL=HttpStreamProtocol.js.map