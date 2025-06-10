import { SignJWT } from "jose"
import db from "../models/index.js"
import bcrypt from "bcryptjs"

export class AuthService {

    async create(userData) {
        try {
            const existingUser = await db.User.findOne({
                where: {
                    email: userData.email
                }
            })
            if (existingUser) {
                throw new Error("User already exists")
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            const user = await db.User.create({
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            })
            return user;
        } catch (error) {
            // Log the error for debugging (consider using a proper logger)
            console.error("Error in user creation:", error);
            throw error;
        }
    }

    async login(credentials) {
        try {
            // Validate credentials
            if (!credentials.email || !credentials.password) {
                throw new Error("Email and password are required");
            }
            
            const user = await db.User.findOne({
                where: {
                    email: credentials.email
                }
            });
            
            if (!user) {
                throw new Error("User not found");
            }
            
            const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);
            if (!isPasswordMatched) {
                throw new Error("Invalid password");
            }

            // Generate JWT token
            const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production');

            const token = await new SignJWT({
                id: user.id,
                name: user.name,
                email: user.email
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime(process.env.JWT_EXPIRATION_TIME || '24h')
                .sign(JWT_SECRET);

            return { token };
        } catch (error) {
            console.error("Error in login:", error);
            throw error;
        }
    }

}
