import Link from "next/link";
import { useState, ReactNode } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface SidebarProps {
    children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data } = useSession();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`group sidebar-admin${isOpen ? " open" : ""}`}>
                <div className="logo-details flex justify-between">
                    <Link
                        href={"/"}
                        className="logo_name hidden text-white text-xl font-semibold opacity-0 transition-all duration-[0.5s] ease-[ease] group-[.open]:block group-[.open]:opacity-100"
                    >
                        E-Voting
                    </Link>
                    <i
                        className="material-symbols-outlined cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        {isOpen ? "menu_open" : "menu"}
                    </i>
                </div>
                <ul className="nav-list">
                    <li>
                        <Link href={"/admin/dashboard"}>
                            <i className="material-symbols-outlined">
                                grid_view
                            </i>
                            <span className="links_name">Dashboard</span>
                        </Link>
                        <span className="tooltip">Dashboard</span>
                    </li>
                    {/* <li>
                        <Link href={"/admin/candidates"}>
                            <i className="material-symbols-outlined">
                                account_box
                            </i>
                            <span className="links_name">Candidates</span>
                        </Link>
                        <span className="tooltip">Candidates</span>
                    </li> */}
                    <li>
                        <Link href={"/admin/campaigns"}>
                            <i className="material-symbols-outlined">
                                campaign
                            </i>
                            <span className="links_name">Campaigns</span>
                        </Link>
                        <span className="tooltip">Campaigns</span>
                    </li>
                    <li className="profile">
                        <div className="profile-details">
                            <Image
                                src={
                                    data?.user?.image
                                        ? data?.user?.image
                                        : "/static/images/user-default.jpg"
                                }
                                alt="Image Profile"
                                width={100}
                                height={100}
                            />
                            <div className="name_job">
                                <div className="name">{data?.user?.name}</div>
                                <div className="job">Administrator</div>
                            </div>
                        </div>
                        <i
                            className="material-symbols-outlined cursor-pointer"
                            id="log_out"
                            onClick={() => signOut()}
                        >
                            logout
                        </i>
                    </li>
                </ul>
            </div>

            <section className={`group${isOpen ? " open" : ""}`}>
                <div className="relative min-h-screen w-[calc(100%_-_78px)] transition-all duration-[0.5s] ease-[ease] z-[2] left-[78px] top-0 p-4 group-[.open]:w-[calc(100%_-_250px)] group-[.open]:left-[250px]">
                    {children}
                </div>
            </section>
        </>
    );
};

export default Sidebar;
