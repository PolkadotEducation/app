import { NextResponse } from "next/server";
import { serverGet } from "@/api/actions/api";

export async function GET() {
  try {
    const response = await serverGet<{ challenges: unknown }>("/challenges/user");
    return NextResponse.json(response);
  } catch (_error) {
    return NextResponse.json({ error: { message: "Failed to fetch user challenges" } }, { status: 500 });
  }
}
