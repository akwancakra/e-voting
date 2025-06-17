import CampaignCardHorizontal from "@/components/elements/campaigns/admin/CampaignCardHorizontal";
import NotificationGroup from "@/components/elements/campaigns/admin/NotificationGroup";
import { Campaign } from "@/types/campaign.type";
import { fetcher } from "@/utils/db/fetcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import useSWR from "swr";
import Head from "next/head";

const DashboardPage = () => {
  const notifsModal = useRef<HTMLDialogElement>(null);

  const handlerModal = () => {
    notifsModal.current?.showModal();
  };

  const { data: sesData } = useSession();

  const { data, error, isLoading } = useSWR(
    "/api/campaigns?active=true&limit=3",
    fetcher
  );

  const {
    data: notifData,
    error: notifError,
    isLoading: notifIsLoading,
  } = useSWR("/api/notifs?limit=10&grouped=true", fetcher);

  return (
    <>
      <Head>
        <title>Admin - Dashboard | E-Voting</title>
      </Head>
      <section className="mx-auto max-w-6xl bg-pimary-dpurple rounded-xl p-4 min-h-28 mb-4">
        <p className="tracking-tighter text-white text-lg">
          Hi{" "}
          <span className="font-bold text-purple-100">
            {sesData?.user?.name}
          </span>
        </p>
      </section>
      <section className="mx-auto max-w-6xl grid gap-4 min-h-full grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 border border-gray-300 rounded-lg p-4 h-fit">
          <h1 className="tracking-tighter font-semibold text-lg mb-2 md:text-xl">
            3 Campaign Active
          </h1>
          {isLoading ? (
            <div className="alert border border-primary bg-purple-100 text-purple-800 py-3.5 my-3 w-full rounded-lg">
              <span className="loading loading-spinner loading-sm"></span>
              <p>Loading data...</p>
            </div>
          ) : (
            !error &&
            data?.campaigns?.campaigns &&
            data.campaigns.campaigns.map(
              (campaign: Campaign, index: number) => (
                <CampaignCardHorizontal key={index} campaign={campaign} />
              )
            )
          )}
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-fit">
          <h1 className="tracking-tighter font-semibold text-lg mb-2 md:text-xl">
            Person Voted
          </h1>
          {notifIsLoading ? (
            <div className="alert border border-primary bg-purple-100 text-purple-800 py-3.5 my-3 w-full rounded-lg">
              <span className="loading loading-spinner loading-sm"></span>
              <p>Loading data...</p>
            </div>
          ) : (
            !notifError &&
            notifData?.notifs && (
              <NotificationGroup notifsGroupedByDate={notifData.notifs} />
            )
          )}
          {/* <div className="flex justify-center items-center">
                        <button
                            type="button"
                            onClick={handlerModal}
                            className="btn btn-outline btn-primary text-white py-2 px-3 text-sm h-fit min-h-fit"
                        >
                            Show More
                        </button>
                    </div> */}
        </div>
      </section>

      {/* CANDIDATE MODALS */}
      {/* <dialog
                id="personVoted"
                className="modal modal-bottom sm:modal-middle"
                ref={notifsModal}
            >
                <div className="modal-box rounded-lg p-6">
                    <h3 className="font-semibold tracking-tighter text-lg sm:text-xl">
                        Person Voted
                    </h3>
                    <div className="divider my-1" />
                    <p className="tracking-tighter font-semibold text-gray-600 mb-2">
                        12 January
                    </p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 mb-2">
                        <span className="flex justify-center items-center rounded-full bg-purple-400 p-3 text-white h-fit w-fit">
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                rezky@upi.edu vote
                                <span className="text-primary font-semibold">
                                    02
                                </span>
                                on
                                <span className="text-primary font-semibold">
                                    BEM Elections
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">
                                12 Hours ago
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 mb-2">
                        <span className="flex justify-center items-center rounded-full bg-purple-400 p-3 text-white h-fit w-fit">
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                rezky@upi.edu vote
                                <span className="text-primary font-semibold">
                                    02
                                </span>
                                on
                                <span className="text-primary font-semibold">
                                    BEM Elections
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">
                                12 Hours ago
                            </p>
                        </div>
                    </div>
                    <p className="tracking-tighter font-semibold text-gray-600 mb-2">
                        31 December 2023
                    </p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 mb-2">
                        <span className="flex justify-center items-center rounded-full bg-purple-400 p-3 text-white h-fit w-fit">
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                rezky@upi.edu vote
                                <span className="text-primary font-semibold">
                                    02
                                </span>
                                on
                                <span className="text-primary font-semibold">
                                    BEM Elections
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">
                                12 Hours ago
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 mb-2">
                        <span className="flex justify-center items-center rounded-full bg-purple-400 p-3 text-white h-fit w-fit">
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                rezky@upi.edu vote
                                <span className="text-primary font-semibold">
                                    02
                                </span>
                                on
                                <span className="text-primary font-semibold">
                                    BEM Elections
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">
                                12 Hours ago
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 mb-2">
                        <span className="flex justify-center items-center rounded-full bg-purple-400 p-3 text-white h-fit w-fit">
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                rezky@upi.edu vote
                                <span className="text-primary font-semibold">
                                    02
                                </span>
                                on
                                <span className="text-primary font-semibold">
                                    BEM Elections
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">
                                12 Hours ago
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 mb-2">
                        <span className="flex justify-center items-center rounded-full bg-purple-400 p-3 text-white h-fit w-fit">
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </span>
                        <div>
                            <p className="text-gray-500 text-sm">
                                rezky@upi.edu vote
                                <span className="text-primary font-semibold">
                                    02
                                </span>
                                on
                                <span className="text-primary font-semibold">
                                    BEM Elections
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">
                                12 Hours ago
                            </p>
                        </div>
                    </div> */}
      {/* <div className="modal-action">
                        <form method="dialog"> */}
      {/* if there is a button in form, it will close the modal */}
      {/* <button className="btn py-2 px-3 text-sm h-fit min-h-fit">
                                Tutup
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog> */}
    </>
  );
};

export default DashboardPage;
