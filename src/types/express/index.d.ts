import { JwtPayload } from "jsonwebtoken";

// Assuming your JWT payload contains `id` (adjust as needed)
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | { id: number }; // Add more fields as per your payload
    }
  }
}
