import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("jwt")?.value;

  // ✅ 如果請求已經在 `/`，就不要重定向，避免迴圈
  if (!jwt && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// ✅ 避免影響 API 和 Next.js 內部路徑
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};