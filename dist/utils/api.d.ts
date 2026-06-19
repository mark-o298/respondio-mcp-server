import { RespondIO, type ContactIdentifier } from "@respond-io/typescript-sdk";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Ctx } from "../types.js";
/**
 * Configuration for SDK client creation
 */
interface ClientConfig {
    apiToken: string;
    baseUrl: string;
    maxRetries?: number;
    timeout?: number;
}
/**
 * Client health status
 */
interface ClientHealth {
    isHealthy: boolean;
    lastChecked: Date;
    errorCount: number;
    responseTime?: number;
}
/**
 * Enhanced SDK Client Manager with best practices
 */
declare class SdkClientManager {
    private static instance;
    private clients;
    private healthStatus;
    private healthCheckInterval?;
    private readonly defaultConfig;
    private constructor();
    static getInstance(): SdkClientManager;
    /**
     * Create a client key for caching
     * Uses a hash of the token to avoid collisions while keeping keys readable
     */
    private createClientKey;
    /**
     * Get or create an SDK client with enhanced configuration
     */
    getClient(config: ClientConfig): RespondIO;
    /**
     * Determine if a client should be recreated based on health status
     */
    private shouldRecreateClient;
    /**
     * Mark a client as unhealthy (called when API calls fail)
     */
    markClientUnhealthy(config: ClientConfig): void;
    /**
     * Perform health check on a client
     */
    private performHealthCheck;
    /**
     * Start periodic health checks
     */
    private startHealthChecks;
    /**
     * Stop health checks
     */
    private stopHealthChecks;
    /**
     * Setup graceful shutdown handlers
     */
    private setupGracefulShutdown;
    /**
     * Get client statistics
     */
    getClientStats(): {
        totalClients: number;
        healthyClients: number;
        unhealthyClients: number;
        healthStatus: Record<string, ClientHealth>;
    };
}
export declare const sdkClientManager: SdkClientManager;
/**
 * Get comprehensive client statistics and health information
 */
export declare function getSdkClientStats(): {
    uptime: number;
    memoryUsage: NodeJS.MemoryUsage;
    nodeVersion: string;
    totalClients: number;
    healthyClients: number;
    unhealthyClients: number;
    healthStatus: Record<string, ClientHealth>;
};
/**
 * Initialize client monitoring (call this once at app startup).
 * Logs cached client stats periodically; SdkClientManager already runs health checks.
 */
export declare function initializeClientMonitoring(): void;
/**
 * Formats a contact identifier for the Respond.io SDK.
 * Accepts various input formats and converts them to the proper SDK format.
 *
 * @param {string} identifier - The contact identifier in flexible format
 * @returns {ContactIdentifier} - Properly formatted contact identifier
 */
export declare function formatContactIdentifier(identifier: string): ContactIdentifier;
/**
 * Creates a new Respond.io SDK client with enhanced error handling and caching.
 *
 * @param {string} apiBaseUrl - The base URL for the API.
 * @param {string} mode - The mode of operation ("http" or "stdio").
 * @param {Ctx} ctx - The context object containing request information.
 * @returns {RespondIO} - A configured Respond.io SDK client.
 * @throws {Error} - Throws an error if the API base URL or token is not set.
 */
export declare function createSdkClient(apiBaseUrl: string, mode: string, ctx: Ctx): RespondIO;
/**
 * Handles a successful SDK response by stringifying the data and returning it as a `CallToolResult`.
 *
 * @param {unknown} data - The response data from the SDK.
 * @returns {CallToolResult} - A `CallToolResult` object containing the stringified response data.
 */
export declare const handleSdkResponse: (data: unknown) => CallToolResult;
/**
 * Handles an SDK error by creating a descriptive error message and returning it as a `CallToolResult`.
 *
 * @param {unknown} error - The error object.
 * @returns {CallToolResult} - A `CallToolResult` object containing the error message.
 */
export declare const handleSdkError: (error: unknown) => CallToolResult;
export {};
//# sourceMappingURL=api.d.ts.map