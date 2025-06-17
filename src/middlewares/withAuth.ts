import { getToken } from "next-auth/jwt";
import {
    NextFetchEvent,
    NextMiddleware,
    NextRequest,
    NextResponse,
} from "next/server";

const onlyAdmin = ["/admin"];
const restrictedRoutes = ["/auth/login"];

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = []
) {
    return async function (req: NextRequest, next: NextFetchEvent) {
        const pathname = req.nextUrl.pathname;
        if (requireAuth.some((reqPath) => pathname.startsWith(reqPath))) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET,
            });
            if (!token) {
                const url = new URL("/auth/login", req.url);
                url.searchParams.set("callbackUrl", encodeURI(req.url));
                return NextResponse.redirect(url);
            }
            if (
                token.role !== "ADMIN" &&
                onlyAdmin.some((adminPath) => pathname.startsWith(adminPath))
            ) {
                const url = new URL("/", req.url);
                return NextResponse.redirect(url);
            }
        } else if (restrictedRoutes.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET,
            });
            if (token) {
                const url = new URL("/", req.url);
                return NextResponse.redirect(url);
            }
        }
        return middleware(req, next);
    };
}
