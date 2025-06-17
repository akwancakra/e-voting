import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/globalsicon.css";
import AppShell from "@/components/layouts/AppShell";
import { Toaster } from "sonner";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <Toaster richColors />
            <AppShell>
                <Component {...pageProps} />
            </AppShell>
        </SessionProvider>
    );
}
