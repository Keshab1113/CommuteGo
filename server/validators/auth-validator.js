const { z } = require("zod");

const loginSchema = z.object({
    email: z.string()
        .trim()
        .toLowerCase()
        .email("Invalid email address")
        .min(3, "Email must be at least 3 characters.")
        .max(255, "Email must not exceed 255 characters.")
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),
    
    password: z.string()
        .min(6, "Password must be at least 6 characters.")
        .max(1024, "Password must not exceed 1024 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/\d/, "Password must contain at least one number.")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character.")
});

const signupSchema = loginSchema.extend({
    username: z.string()
        .trim()
        .min(3, "Username must be at least 3 characters.")
        .max(255, "Username must not exceed 255 characters.")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
});

module.exports = { signupSchema, loginSchema };
