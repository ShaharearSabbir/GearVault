import { JWTPayload } from "jose";

declare module "jose" {
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
