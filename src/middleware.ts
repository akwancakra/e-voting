import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req: NextRequest) {
    const res = NextResponse.next();
    return res;
}

export default withAuth(mainMiddleware, ["/profile", "/admin"]);
