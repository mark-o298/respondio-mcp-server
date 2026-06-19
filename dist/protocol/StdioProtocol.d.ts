import { BaseProtocol } from "./BaseProtocol.js";
type InitOptions = {
    apiBaseUrl: string;
    debug: boolean;
};
export declare class StdioProtocol extends BaseProtocol {
    private readonly apiBaseUrl;
    private readonly debug;
    constructor(options: InitOptions);
    init(): Promise<void>;
    close(): Promise<void>;
}
export {};
//# sourceMappingURL=StdioProtocol.d.ts.map