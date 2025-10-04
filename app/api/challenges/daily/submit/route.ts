import { NextRequest, NextResponse } from "next/server";
import { serverPost } from "@/api/actions/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { challengeId, choice } = body;
    const response = await serverPost<{ points: number }>("/progress/daily", { challengeId, choice });
    return NextResponse.json(response);
  } catch (_error) {
    return NextResponse.json({ error: { message: "Failed to submit daily challenge answer" } }, { status: 500 });
  }
}
