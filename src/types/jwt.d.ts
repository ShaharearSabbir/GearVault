import { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface VerificationTokenPayload extends JwtPayload {
    id: string;
    email: string;
  }

  export interface AccessTokenPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
  }

  export interface RefreshTokenPayload extends JwtPayload {
    id: string;
  }
}
