import { env } from "@/env";
import jwt from "jsonwebtoken";

export class Jwt {
  private static secret = env.JWT_SECRET;

  static sign(payload: string | object | Buffer, options?: jwt.SignOptions) {
    return jwt.sign(payload, this.secret, options);
  }

  static verify(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      return null;
    }
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}
