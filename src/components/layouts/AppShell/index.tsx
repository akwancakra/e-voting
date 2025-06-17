import localFont from "next/font/local";
import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "../Sidebar"; // Tambahkan Sidebar component jika belum ada

type AppShellProps = {
    children: React.ReactNode;
};

const disableNavbar = ["/auth/login", "/404", "/500"];
const adminPaths = ["/admin"]; // Tambahkan path "/admin" atau path lain yang memerlukan Sidebar

const monumentFont = localFont({
    src: "../../../../public/static/fonts/MonumentExtendedUltrabold.otf",
    variable: "--font-monument",
});

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();

    return (
        <main className={`${monumentFont.variable}`}>
            {adminPaths.some((path) => pathname.startsWith(path)) ? (
                <>
                    <Sidebar>{children}</Sidebar>
                </>
            ) : (
                <>
                    {!disableNavbar.includes(pathname) && <Navbar />}
                    {children}
                    {!disableNavbar.includes(pathname) && <Footer />}
                </>
            )}
        </main>
    );
};

export default AppShell;
