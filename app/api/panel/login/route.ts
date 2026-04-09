import { NextResponse } from "next/server";
import {
  PANEL_AUTH_COOKIE,
  PANEL_PASSWORD,
  PANEL_USERNAME,
  getPanelAuthToken,
} from "@/lib/panel-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = body?.username?.toString?.().trim();
  const password = body?.password?.toString?.().trim();
  const authToken = getPanelAuthToken();

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, message: "Kullanıcı adı ve şifre zorunludur." },
      { status: 401 },
    );
  }

  if (username !== PANEL_USERNAME || password !== PANEL_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Kullanıcı adı veya şifre hatalı." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: PANEL_AUTH_COOKIE,
    value: authToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

