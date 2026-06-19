import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MCPServerOptions } from "./types.js";
/**
 * Creates and configures the MCP server.
 * This function initializes the MCP server, registers all the available tools, and returns the server instance.
 *
 * @param {MCPServerOptions} options - The options for configuring the server, including the API base URL, debug mode, and server mode.
 * @returns {{ server: McpServer }} - An object containing the configured MCP server instance.
 */
export declare const createServer: (options: MCPServerOptions) => {
    server: McpServer;
};
//# sourceMappingURL=server.d.ts.map