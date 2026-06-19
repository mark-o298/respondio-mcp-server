import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "../server.js";
import { BaseProtocol } from "./BaseProtocol.js";
export class StdioProtocol extends BaseProtocol {
    apiBaseUrl;
    debug;
    constructor(options) {
        super();
        this.apiBaseUrl = options.apiBaseUrl;
        this.debug = options.debug;
    }
    async init() {
        const transport = new StdioServerTransport();
        const { server } = createServer({
            apiBaseUrl: this.apiBaseUrl,
            debug: this.debug,
            mode: "stdio",
        });
        try {
            await server.connect(transport);
            console.error("MCP STDIO Server listening");
        }
        catch (error) {
            console.error("Failed to set up the server:", error);
            throw error;
        }
    }
    async close() {
        // No-op for STDIO
    }
}
//# sourceMappingURL=StdioProtocol.js.map