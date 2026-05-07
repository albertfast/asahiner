import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/albertfast/repos?sort=updated&per_page=6",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "AhmetSahiner-Portfolio",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch repos" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
