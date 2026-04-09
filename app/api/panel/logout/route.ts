import { NextResponse } from "next/server";
import { PANEL_AUTH_COOKIE } from "@/lib/panel-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: PANEL_AUTH_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}

