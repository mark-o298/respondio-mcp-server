import { BaseTool } from "./BaseTool.js";
import { Tool } from "../types.js";
/**
 * A tool for managing comments on contacts.
 * This tool allows you to create comments for a given contact, which can be used for internal notes and collaboration.
 */
export declare class CommentTool extends BaseTool {
    /**
     * The list of tools provided by the CommentTool.
     * It includes the `create_comment` tool, which allows you to add a comment to a contact.
     */
    protected tools: Tool[];
}
//# sourceMappingURL=comment.tool.d.ts.map