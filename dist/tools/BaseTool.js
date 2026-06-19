/**
 * Abstract base class for creating tools to register with the MCP server.
 * It simplifies tool creation by handling common initialization and registration logic.
 */
export class BaseTool {
    /**
     * The base URL for the API, used by all tools.
     */
    apiBaseUrl;
    /**
     * A flag indicating whether debug mode is enabled.
     */
    debug;
    /**
     * The mode in which the server is running, either "http" or "stdio."
     */
    mode;
    /**
     * Initializes the BaseTool with the given server options.
     * @param {MCPServerOptions} options - The server options, including the API base URL, API token, debug flag, and mode.
     */
    constructor({ apiBaseUrl, debug, mode }) {
        this.apiBaseUrl = apiBaseUrl;
        this.debug = debug;
        this.mode = mode;
    }
    /**
     * Registers all the tools defined in the `tools` array with the MCP server.
     * This method iterates over the `tools` array and registers each tool
     * with the server using its name, description, schema, and handler.
     * @param {McpServer} server - The MCP server instance to register the tools with.
     */
    register(server) {
        for (const { name, description, schema, handler } of this.tools) {
            server.tool(name, description, schema, handler);
        }
    }
}
//# sourceMappingURL=BaseTool.js.map