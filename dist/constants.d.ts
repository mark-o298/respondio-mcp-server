/**
 * Constants for the Respond.io MCP Server
 */
export declare const APP_CONFIG: {
    readonly PORT: number;
    readonly debug: false;
};
export declare const API_CONFIG: {
    readonly BASE_URL: string;
    readonly API_KEY: string | undefined;
    readonly TIMEOUT: 30000;
    readonly MAX_RETRIES: 3;
    readonly RETRY_DELAY: 1000;
};
export declare const PAGINATION: {
    readonly DEFAULT_LIMIT: 10;
    readonly MIN_LIMIT: 1;
    readonly MAX_LIMIT: 100;
};
export declare const FIELD_LIMITS: {
    readonly CUSTOM_FIELD_NAME_MAX_LENGTH: 50;
    readonly CUSTOM_FIELD_SLUG_MAX_LENGTH: 50;
    readonly CUSTOM_FIELD_DESCRIPTION_MAX_LENGTH: 255;
    readonly TAG_MAX_LENGTH: 255;
    readonly TAG_MAX_COUNT: 10;
    readonly COMMENT_MAX_LENGTH: 1000;
    readonly CLOSING_NOTE_CATEGORY_MAX_LENGTH: 128;
    readonly CLOSING_NOTE_SUMMARY_MAX_LENGTH: 512;
};
export declare const MESSAGE_TYPES: readonly ["text", "attachment", "whatsapp_template", "email", "quick_reply", "custom_payload"];
export declare const ATTACHMENT_TYPES: readonly ["image", "video", "audio", "file"];
export declare const CUSTOM_FIELD_DATA_TYPES: readonly ["text", "list", "checkbox", "email", "number", "url", "date", "time"];
export declare const CONVERSATION_STATUSES: readonly ["open", "close"];
export declare const USER_ROLES: readonly ["agent", "manager", "owner"];
export declare const CHANNEL_SOURCES: readonly ["facebook", "instagram", "line", "telegram", "viber", "twitter", "wechat", "custom_channel", "gmail", "other_email", "twilio", "message_bird", "nexmo", "360dialog_whatsapp", "twilio_whatsapp", "message_bird_whatsapp", "whatsapp", "nexmo_whatsapp", "whatsapp_cloud"];
export declare const MESSAGE_STATUSES: readonly ["pending", "sent", "delivered", "read", "failed"];
export declare const FILTER_OPERATORS: readonly ["isEqualTo", "isNotEqualTo", "isTimestampAfter", "isTimestampBefore", "isTimestampBetween", "exists", "doesNotExist", "isGreaterThan", "isLessThan", "isBetween", "hasAnyOf", "hasAllOf", "hasNoneOf"];
export declare const FILTER_CATEGORIES: readonly ["contactField", "contactTag", "lifecycle"];
export declare const FACEBOOK_MESSAGE_TAGS: readonly ["ACCOUNT_UPDATE", "POST_PURCHASE_UPDATE", "CONFIRMED_EVENT_UPDATE"];
export declare const ERROR_CODES: {
    readonly VALIDATION_ERROR: 400;
    readonly UNAUTHORIZED: 401;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly RATE_LIMIT: 429;
    readonly REQUEST_QUEUED: 449;
    readonly SERVER_ERROR: 500;
};
export declare const ERROR_MESSAGES: {
    readonly INVALID_API_KEY: "Invalid or missing API key";
    readonly INVALID_IDENTIFIER: "Invalid identifier format. Use 'id:123', 'email:user@example.com', or 'phone:+1234567890'";
    readonly INVALID_EMAIL: "Invalid email format";
    readonly INVALID_PHONE: "Invalid phone number format. Use E.164 format (e.g., +60123456789)";
    readonly INVALID_URL: "Invalid URL format";
    readonly INVALID_LANGUAGE_CODE: "Invalid language code. Use ISO 639-1 format (e.g., 'en', 'ms')";
    readonly INVALID_COUNTRY_CODE: "Invalid country code. Use ISO 3166-1 alpha-2 format (e.g., 'MY', 'US')";
    readonly MISSING_REQUIRED_FIELD: "Missing required field";
    readonly TAG_TOO_LONG: "Tag exceeds maximum length of 255 characters";
    readonly TOO_MANY_TAGS: "Cannot add more than 10 tags";
    readonly COMMENT_TOO_LONG: "Comment exceeds maximum length of 1000 characters";
};
export declare const HTTP_STATUS_DESCRIPTIONS: {
    readonly 200: "OK";
    readonly 400: "Bad Request";
    readonly 401: "Unauthorized";
    readonly 404: "Not Found";
    readonly 409: "Conflict";
    readonly 429: "Too Many Requests";
    readonly 449: "Retry With";
    readonly 500: "Internal Server Error";
};
export declare const REGEX_PATTERNS: {
    readonly IDENTIFIER_ID: RegExp;
    readonly IDENTIFIER_EMAIL: RegExp;
    readonly IDENTIFIER_PHONE: RegExp;
    readonly EMAIL: RegExp;
    readonly PHONE_E164: RegExp;
    readonly ISO_DATE: RegExp;
    readonly TIME_24H: RegExp;
    readonly LANGUAGE_CODE: RegExp;
    readonly COUNTRY_CODE: RegExp;
    readonly SLUG: RegExp;
};
export declare const DEFAULT_TIMEZONE = "UTC";
export declare const SERVER_INFO: {
    readonly NAME: "respondio-mcp-server";
    readonly VERSION: "1.0.0";
    readonly DESCRIPTION: "Model Context Protocol server for Respond.io API";
};
//# sourceMappingURL=constants.d.ts.map