import { Express } from "express";
import { Server as HttpServer } from "http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { BaseProtocol } from "./BaseProtocol.js";
type InitOptions = {
    port: number;
    apiBaseUrl: string;
    debug: boolean;
    staticDir?: string;
    corsOrigin?: string | string[] | true;
    allowedHeaders?: string;
    sessionIdGenerator?: (() => string) | undefined;
    app?: Express;
};
type InitResult = {
    app: Express;
    httpServer: HttpServer;
    transport?: StreamableHTTPServerTransport;
    close: () => Promise<void>;
    port: number;
};
export declare class HttpStreamProtocol extends BaseProtocol {
    private readonly options;
    private app?;
    private httpServer?;
    private transport?;
    private closing;
    private readonly sessions;
    private readonly port;
    private readonly apiBaseUrl;
    private readonly debug;
    constructor(options: InitOptions);
    init(): Promise<InitResult>;
    close(): Promise<void>;
}
export {};
//# sourceMappingURL=HttpStreamProtocol.d.ts.map