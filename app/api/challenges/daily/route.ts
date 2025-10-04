import { NextResponse } from "next/server";
import { serverPost } from "@/api/actions/api";
import { getUserLocale } from "@/api/actions/userLocale";
import { LOCALE_LANGUAGES } from "@/components/constants";

export async function GET() {
  try {
    const locale = await getUserLocale();
    const language = LOCALE_LANGUAGES[locale as keyof typeof LOCALE_LANGUAGES] || "english";
    const response = await serverPost<{ daily: unknown }>("/challenges/daily", { language });
    return NextResponse.json(response);
  } catch (_error) {
    return NextResponse.json({ error: { message: "Failed to fetch daily challenge" } }, { status: 500 });
  }
}
