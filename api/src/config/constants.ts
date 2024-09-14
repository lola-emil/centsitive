import dotenv from "dotenv";

dotenv.config();

// export const HOST = process.env['HOST'];
export const PORT = parseInt(process.env['PORT'] ?? "5000");
export const SECRET_KEY = process.env['SECRET_KEY'] ?? "secret";

export const DB_HOST = process.env['DB_HOST'];
export const DB_USER = process.env['DB_USER'];
export const DB_PORT = parseInt(process.env['DB_PORT'] ?? "3306");
