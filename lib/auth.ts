import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET as string, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET as string);
}

// generate a secure random token
export function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

// hash a plaintext password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// verify plaintext password against hashed password
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
