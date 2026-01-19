import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/search?${searchParams.toString()}`;

  const res = await fetch(backendUrl, { method: "GET", cache: "no-store" });
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
