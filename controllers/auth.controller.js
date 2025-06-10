import { sendErrorResponse, sendOKResponse } from "../lib/responseHelper.js";

export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async register(req, res) {
        try {
            
            const user = await this.authService.create(req.body);
            return sendOKResponse(res, 201, "User created successfully", {
                id: user.id,
                name: user.name,
                email: user.email
            });
        } catch (error) {
            if (error.message === "User already exists") {
                return sendErrorResponse(res, 409, error.message);
            }
            console.error("User Registration error:", error);
            return sendErrorResponse(res, 500, "Internal server error");
        }
    }
    async login(req, res) {
        try {
            const result = await this.authService.login(req.body);
            return sendOKResponse(res, 200, "Login successful", result);
        } catch (error) {
            // Handle specific errors with appropriate status codes
            if (error.message === "User not found") {
                return sendErrorResponse(res, 404, error.message);
            }
            console.error("User Login error:", error);
            return sendErrorResponse(res, 500, "Internal server error");
        }
    }
}

