import { cookies } from "next/headers";

export class Cookie {
  static async set(name: string, token: string, days: number = 7) {
    const cookieStore = await cookies();

    cookieStore.set(name, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * days,
    });
  }

  static async get(name: string) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);
    return cookie?.value || null;
  }

  static async clear(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  }

  static async has(name: string) {
    const cookieStore = await cookies();
    return cookieStore.has(name);
  }
}
