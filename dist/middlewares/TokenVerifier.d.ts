import { Request, Response, NextFunction } from "express";
import { JWTPayload } from "../types.js";
declare module "express-serve-static-core" {
    interface Request {
        user?: JWTPayload;
    }
}
/**
 * Middleware to verify the authenticity of a JSON Web Token (JWT).
 * If RESPONDIO_API_KEY is set in the environment, it is used as the authorization token.
 * Otherwise, this middleware checks for the presence of a Bearer token in the `Authorization` header,
 * validates its format, and ensures the payload contains all the required fields.
 * If the token is valid, the decoded payload is attached to the `req.user` property.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the chain.
 */
export declare const tokenVerifier: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=TokenVerifier.d.ts.map