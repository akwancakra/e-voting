import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data }: any = useSession();
  const { pathname, push } = useRouter();

  const handleMenu = () => {
    const hamburger = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    if (hamburger && mobileMenu) {
      if (isOpen) {
        // hamburger.classList.remove("open");
        mobileMenu.classList.remove("h-0");
        mobileMenu.classList.add("h-fit");
        setIsOpen(false);
      } else {
        // hamburger.classList.add("open");
        mobileMenu.classList.remove("h-fit");
        mobileMenu.classList.add("h-0");
        setIsOpen(true);
      }
    }
  };

  return (
    <nav className="bg-base">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              id="hamburger-menu"
              onClick={handleMenu}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {/*
                                Icon when menu is closed.
                                Menu open: "hidden", Menu closed: "block"
                            */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/*
                                Icon when menu is open.
                                Menu open: "block", Menu closed: "hidden"
                            */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center ms-2 sm:ms-0 sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href={"/"} className="font-poppins font-semibold">
                E-Voting
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href={"/"}
                  className={`text-gray-700 rounded-md px-3 py-2 text-sm font-medium transition-all ease-in-out hover:bg-gray-100${
                    pathname == "/" && " bg-gray-200 font-semibold"
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
                {data?.user?.role === "ADMIN" && (
                  <Link
                    href={"/admin/dashboard"}
                    className={`text-gray-700 rounded-md !ms-0 px-3 py-2 text-sm font-medium transition-all ease-in-out hover:bg-gray-100${
                      pathname.startsWith("/admin") &&
                      " bg-gray-200 font-semibold"
                    }`}
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="dropdown !ml-0 cursor-pointer dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className={`text-gray-700 rounded-md text-sm font-medium cursor-pointer px-3 py-2 transition-all ease-in-out hover:bg-gray-100${
                      pathname.startsWith("/campaigns") &&
                      " bg-gray-200 font-semibold"
                    }`}
                  >
                    Campaigns
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] border border-gray-300 menu p-2 shadow bg-base-100 rounded-lg w-52"
                  >
                    <li>
                      <Link href={"/campaigns"}>
                        BEM Election
                        <div className="badge badge-primary">LIVE</div>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/campaigns"}>Campaign List</Link>
                    </li>
                  </ul>
                </div>
                <Link
                  href={"/helps"}
                  aria-current="page"
                  className={`text-gray-700 rounded-md px-3 py-2 text-sm !ms-0 font-medium transition-all ease-in-out hover:bg-gray-100${
                    pathname.startsWith("/helps") &&
                    " bg-gray-200 font-semibold"
                  }`}
                >
                  Help
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
            <div className="hidden items-center gap-2 sm:flex">
              {data?.user ? (
                <div className="dropdown dropdown-end">
                  {data.user.image ? (
                    <div
                      tabIndex={0}
                      role="button"
                      className="flex items-center justify-center py-1 px-1 text-sm h-10 min-h-10 rounded-full leading-none overflow-hidden transition-all ease-in-out hover:bg-gray-300"
                    >
                      <Image
                        alt="User image"
                        src={data.user.image}
                        className="w-9 h-9 rounded-full"
                        width={24}
                        height={24}
                      />
                    </div>
                  ) : (
                    <div
                      tabIndex={0}
                      role="button"
                      className="bg-purple-600 text-white flex items-center justify-center py-2 px-2.5 text-sm h-10 min-h-10 rounded-full leading-none overflow-hidden"
                    >
                      <span className="material-symbols-outlined !text-xl">
                        account_circle
                      </span>
                    </div>
                  )}
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] mt-2 border border-gray-300 menu p-2 shadow bg-base-100 w-52 rounded-lg"
                  >
                    <div className="flex items-center gap-2 px-1 py-2 overflow-x-hidden break-words">
                      {data.user.image ? (
                        <Image
                          src={data.user.image}
                          alt="User image"
                          className="w-8 h-8 rounded-full"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <div className="flex justify-center items-center bg-purple-600 text-white rounded-full p-1 h-8 w-8">
                          <span className="material-symbols-outlined !text-xl">
                            account_circle
                          </span>
                        </div>
                      )}
                      <p className="break-words text-sm">{data.user.name}</p>
                    </div>
                    <li>
                      <Link href={"/profile"}>
                        <span className="material-symbols-outlined !text-xl">
                          badge
                        </span>
                        Profile
                      </Link>
                    </li>
                    <div className="divider my-0"></div>
                    <li>
                      <button
                        onClick={() => signOut()}
                        type="button"
                        className="text-red-500 bg-red-50 py-2 px-3 h-fit min-h-fit hover:bg-red-100"
                      >
                        <span className="material-symbols-outlined !text-xl">
                          logout
                        </span>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  onClick={() => push("/login")}
                  type="button"
                  className="btn btn-primary rounded-lg py-2 px-3 text-sm h-fit min-h-fit"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className="absolute z-10 w-full bg-base-100 rounded-b-lg transition-all duration-75 ease-in-out h-0 overflow-hidden sm:hidden"
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href={"/"}
            className={`block rounded-md px-3 py-2 text-sm transition-all ease-in-out ${
              pathname == "/"
                ? "bg-gray-900 text-white hover:bg-gray-500"
                : "bg-slate-200 hover:bg-gray-900 hover:text-white"
            }`}
            aria-current="page"
          >
            Home
          </Link>
          <Link
            href={"/admin/dashboard"}
            className={`block rounded-md px-3 py-2 text-sm transition-all ease-in-out ${
              pathname.startsWith("/admin")
                ? "bg-gray-900 text-white hover:bg-gray-500"
                : "bg-slate-200 hover:bg-gray-900 hover:text-white"
            }`}
            aria-current="page"
          >
            Dashboard
          </Link>
          <div className="collapse collapse-arrow rounded-md bg-slate-200">
            <label htmlFor="menu-1" className="hidden">
              MENU 1
            </label>
            <input
              type="checkbox"
              name="menu-1"
              id="menu-1"
              className="min-h-0"
            />
            <div
              className={`collapse-title text-sm py-2 px-3 min-h-0 after:!top-5 ${
                pathname.startsWith("/campaigns")
                  ? "bg-gray-900 text-white hover:bg-gray-500"
                  : "bg-slate-200 hover:bg-gray-500"
              }`}
            >
              Campaigns
            </div>
            <div className="collapse-content">
              <Link
                href={"/campaigns"}
                className="hover:bg-gray-900 hover:text-white block transition-all ease-in-out rounded-md px-3 py-2 mt-3 text-sm"
              >
                BEM Elections
              </Link>
              <Link
                href={"/campaigns"}
                className={`block transition-all ease-in-out rounded-md px-3 py-2 text-sm ${
                  pathname == "/campaigns"
                    ? "bg-gray-900 text-white hover:bg-gray-500"
                    : "bg-slate-200 hover:bg-gray-500"
                }`}
              >
                Campaign List
              </Link>
            </div>
          </div>
          <Link
            href={"/helps"}
            className={`block rounded-md px-3 py-2 text-sm ${
              pathname.startsWith("/helps")
                ? "bg-gray-900 text-white hover:bg-gray-500"
                : "bg-slate-200 hover:bg-gray-900 hover:text-white"
            }`}
            aria-current="page"
          >
            Bantuan
          </Link>
          {data?.user?.email ? (
            <button
              onClick={() => signOut()}
              type="button"
              className="btn btn-primary text-white w-full py-2 px-3 text-sm h-fit min-h-fit"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              type="button"
              className="btn btn-primary text-white w-full py-2 px-3 text-sm h-fit min-h-fit"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
