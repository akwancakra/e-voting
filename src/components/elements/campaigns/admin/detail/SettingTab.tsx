import CustomOverlay from "@/components/elements/CustomOverlay";
import ConfirmModal from "@/components/elements/modals/ConfirmModal";
import { Campaign } from "@/types/campaign.type";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { debounce } from "lodash";
import { AllowedEmail } from "@/types/allowedEmail.types";
import Link from "next/link";

interface SettingTabProps {
    campaignData: Campaign;
    isLoading: boolean;
    data: any;
}

const SettingTab: React.FC<SettingTabProps> = ({
    campaignData,
    isLoading,
    data,
}) => {
    const [message, setMessage] = useState<string>("");
    const [isEmailChanged, setIsEmailChanged] = useState<boolean>(false);
    const [allowedEmails, setAllowedEmails] = useState<any>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const { push } = useRouter();

    // REFS
    const finishModal = useRef<HTMLDialogElement>(null);
    const deleteModal = useRef<HTMLDialogElement>(null);

    //! HANDLING CHANGES OF ALLOWED EMAILS
    const validateEmail = (email: string): boolean => {
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailRegex = new RegExp(
            /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/
        );
        return emailRegex.test(email);
    };

    const validateAllowedEmails = (allowedEmails: AllowedEmail[]): boolean => {
        for (const emailData of allowedEmails) {
            const { email } = emailData;

            // Validasi apakah email sesuai format
            if (!validateEmail(email)) {
                return false;
            }
        }

        return true;
    };

    const handleAllowedEmailChange = debounce((updatedEmails: any) => {
        const filteredEmails = updatedEmails.filter(
            (email: any) => email.email !== ""
        );

        // CHECK IF THERES CHANGE BETWEEN CAMPAIGNDATA.ALLOWEDEMAILS AND ALLOWEDEMAILS
        if (
            JSON.stringify(filteredEmails) !==
            JSON.stringify(campaignData.allowedEmails)
        ) {
            setIsEmailChanged(true);
        } else {
            setIsEmailChanged(false);
        }

        // VALIDATE IF EMAILS ARE VALID
        // console.log(validateAllowedEmails());
        if (!validateAllowedEmails(filteredEmails)) {
            setMessage("Email is not valid");
        } else {
            setMessage("");
        }
    }, 700);

    const handleCreateEmailInput = () => {
        setAllowedEmails([...allowedEmails, { email: "" }]);
    };

    const handleRemoveEmailInput = (index: number) => {
        setIsEmailChanged(true);
        setAllowedEmails(
            allowedEmails.filter((_: any, i: number) => i !== index)
        );
    };

    const handleSaveEmailChanges = async () => {
        // CHECK THE ALL OF ALLOWEDEMAILS IS VALID DOMAIN
        // CHECK IF ALL EMAILS ARE VALID DOMAINS
        const filteredEmails = allowedEmails.filter(
            (email: any) => email.email != ""
        );

        // CHECK IF ALL EMAILS ARE VALID DOMAINS
        const isValidDomain = (email: string) => {
            const domainRegex =
                /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
            return domainRegex.test(email);
        };

        // CHECK IF ALL EMAILS ARE VALID DOMAINS
        const isValidEmails = filteredEmails.every((email: any) =>
            isValidDomain(email.email)
        );

        if (!isValidEmails) {
            // Handle invalid emails
            toast.error("Please check the allowed email domains");
            return;
        }

        try {
            await axios
                .post("/api/allowed-emails/change", {
                    campaignId: campaignData.id,
                    emails: filteredEmails,
                })
                .then((res) => {
                    campaignData.allowedEmails = filteredEmails;
                    setAllowedEmails(filteredEmails);
                    toast.success(res.data.message);
                });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message);
            console.log(error);
        }
    };

    //! HANDLING CHANGES OF ALLOWED EMAILS

    //? FORMATTIN DATE
    const calculateTimeLeft = (expiredAt: string) => {
        const now = new Date();
        const expirationDate = new Date(expiredAt);
        const timeLeft = expirationDate.getTime() - now.getTime();
        return Math.max(timeLeft, 0);
    };

    const formatTimeLeft = (timeLeft: number) => {
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));

        // Menambahkan nol di depan jika nilai kurang dari 10
        const formattedHours = hours < 10 ? `0${hours}` : hours;

        return { hours: formattedHours, minutes, seconds };
    };

    const [timeLefts, setTimeLefts] = useState(
        formatTimeLeft(calculateTimeLeft(campaignData?.expiredAt))
    );
    //? FORMATTIN DATE

    //! DELETE CAMPAIGN HERE
    const handleDisable = (e: any) => {
        if (e.target.checked) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    const handlerCampaignDelete = async (isConfirmed: boolean) => {
        if (isConfirmed) {
            try {
                await axios
                    .delete("/api/campaigns/admin/delete", {
                        data: { id: campaignData.id },
                    })
                    .then(() => {
                        toast.success("Campaign deleted successfully!");
                        push("/admin/campaigns");
                    });
            } catch (error: any) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        }
    };

    const handlerCampaignDeleteModal = () => {
        deleteModal.current?.showModal();
    };
    //! DELETE CAMPAIGN HERE

    //! FINISH CAMPAIGN HERE
    const handlerCampaignFinish = async (isConfirmed: boolean) => {
        if (isConfirmed) {
            try {
                await axios
                    .post("/api/campaigns/admin/finish", {
                        id: campaignData.id,
                    })
                    .then(() => {
                        toast.success("Campaign finished successfully!");
                        push(`/admin/campaigns/${campaignData.id}?tab=PREVIEW`);
                    });
            } catch (error: any) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        }
    };

    const handlerCampaignFinishModal = () => {
        finishModal.current?.showModal();
    };
    //! FINISH CAMPAIGN HERE

    useEffect(() => {
        setAllowedEmails([...campaignData?.allowedEmails, { email: "" }]);

        const timer: any = setInterval(() => {
            setTimeLefts(
                formatTimeLeft(calculateTimeLeft(campaignData?.expiredAt))
            );
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {isLoading && <CustomOverlay visible={true} />}

            {/* <div className="flex gap-2"> */}
            <section className="container max-w-6xl mx-auto">
                <h1 className="tracking-tighter font-semibold text-lg md:text-2xl">
                    Campaign Settings
                </h1>

                {/* ALLOWED EMAILS */}
                <div className="mt-5 border border-gray-300 rounded-lg p-4">
                    <p className="tracking-tighter font-semibold">
                        Allowed emails
                    </p>
                    <p className="text-gray-500 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur corporis modi placeat sit magni ullam
                        laborum neque incidunt tempora doloremque? Velit qui
                        voluptatibus laborum aliquam.
                    </p>

                    {message != "" && (
                        <div className="alert border border-primary bg-purple-100 text-purple-800 py-3 my-3 w-full text-sm rounded-lg">
                            <span className="material-symbols-outlined text-lg pr-2">
                                info
                            </span>
                            <p className="mb-0.5">
                                <b>FYI</b>: Allowed emails should be in the
                                format like <b>domain.com</b>
                            </p>
                        </div>
                    )}

                    <div className="mt-2 sm:w-1/2">
                        {allowedEmails?.map(
                            (email: { email: string }, index: number) => (
                                <div className="relative mb-2" key={index}>
                                    <label className="form-control w-full">
                                        <input
                                            name={`allowed_emails_${index}`}
                                            type="text"
                                            placeholder="domain.com"
                                            value={email.email || ""}
                                            // GET THE EMAILS DATA AND UPDATE THE STATE
                                            onChange={(e) => {
                                                const updatedEmails =
                                                    allowedEmails.map(
                                                        (
                                                            emailData: any,
                                                            i: number
                                                        ) => {
                                                            if (index === i) {
                                                                return {
                                                                    ...emailData,
                                                                    email: e
                                                                        .target
                                                                        .value,
                                                                };
                                                            }
                                                            return emailData;
                                                        }
                                                    );
                                                setAllowedEmails(updatedEmails);
                                                handleAllowedEmailChange(
                                                    updatedEmails
                                                );
                                            }}
                                            // onChange={(e) => {
                                            //     const updatedEmails: any = [
                                            //         ...allowedEmails,
                                            //     ];
                                            //     updatedEmails[index].email =
                                            //         e.target.value;
                                            //     setAllowedEmails(updatedEmails);
                                            //     handleAllowedEmailChange();
                                            // }}
                                            className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                                        />
                                    </label>
                                    {allowedEmails.length == index + 1 ? (
                                        <span
                                            className="flex justify-center items-center border border-gray-300 rounded-full px-1.5 py-0.5 h-fit w-fit absolute right-2 bottom-1 cursor-pointer transition-all ease-in-out hover:bg-purple-200 hover:text-purple-500"
                                            onClick={() =>
                                                handleCreateEmailInput()
                                            }
                                        >
                                            <span className="material-symbols-outlined !text-base">
                                                add
                                            </span>
                                        </span>
                                    ) : (
                                        <span
                                            className="flex justify-center items-center border border-gray-300 rounded-full px-1.5 py-0.5 h-fit w-fit absolute right-2 bottom-1 cursor-pointer transition-all ease-in-out hover:bg-red-200 hover:text-red-500"
                                            onClick={() =>
                                                handleRemoveEmailInput(index)
                                            }
                                        >
                                            <span className="material-symbols-outlined !text-base">
                                                close
                                            </span>
                                        </span>
                                    )}
                                </div>
                            )
                        )}
                        {message != "" && (
                            <p className="text-sm text-error">{message}</p>
                        )}
                    </div>
                    <div className="mt-2 flex justify-end">
                        <button
                            type="button"
                            className={`btn text-white py-2 px-6 h-fit min-h-fit text-xs w-full sm:w-fit sm:text-sm ${
                                isEmailChanged
                                    ? "btn-primary"
                                    : "btn-disabled cursor-not-allowed"
                            }`}
                            disabled={isEmailChanged !== true || message != ""}
                            onClick={handleSaveEmailChanges}
                        >
                            Save Changes
                            <span className="material-symbols-outlined !text-lg !leading-none">
                                mark_email_read
                            </span>
                        </button>
                    </div>
                </div>

                {/* FINISH CAMPAIGN */}
                <div className="mt-5 border border-gray-300 rounded-lg p-4">
                    <p className="tracking-tighter font-semibold">
                        Finish campaign
                    </p>
                    <p className="text-gray-500 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur corporis modi placeat sit magni ullam
                        laborum neque incidunt tempora doloremque? Velit qui
                        voluptatibus laborum aliquam.
                    </p>
                    <div className="mt-3">
                        <p className="to-gray-300 text-sm">Time Lefts</p>
                        <p className="font-semibold tracking-tighter text-lg sm:text-2xl">
                            <span>{timeLefts.hours}</span>:
                            <span className="countdown">
                                <span
                                    style={{ "--value": timeLefts.minutes }}
                                ></span>
                            </span>
                            :
                            <span className="countdown">
                                <span
                                    style={{ "--value": timeLefts.seconds }}
                                ></span>
                            </span>
                        </p>
                    </div>
                    <div className="mt-2 flex justify-end">
                        <button
                            type="button"
                            className="btn btn-error text-white py-2 px-4 text-sm h-full min-h-full"
                            onClick={handlerCampaignFinishModal}
                        >
                            Finish Campaign
                            <span className="material-symbols-outlined !text-lg !leading-none">
                                fact_check
                            </span>
                        </button>
                    </div>
                </div>

                {/* EDIT CAMPAIGN */}
                <div className="mt-5 border border-gray-300 rounded-lg p-4">
                    <p className="tracking-tighter font-semibold">
                        Edit Campaign
                    </p>
                    <p className="text-gray-500 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur corporis modi placeat sit magni ullam
                        laborum neque incidunt tempora doloremque? Velit qui
                        voluptatibus laborum aliquam.
                    </p>
                    <div className="mt-2 flex justify-end">
                        <Link
                            className="btn btn-warning text-white py-2 px-6 h-fit min-h-fit text-xs w-full sm:w-fit sm:text-sm"
                            href={`/admin/campaigns/a/edit?id=${campaignData.id}`}
                        >
                            Edit Campaign
                            <span className="material-symbols-outlined !text-lg !leading-none">
                                border_color
                            </span>
                        </Link>
                    </div>
                </div>

                {/* DELETE CAMPAIGN */}
                <div className="mt-5 border border-gray-300 rounded-lg p-4">
                    <p className="tracking-tighter font-semibold">
                        Delete campaign
                    </p>
                    <p className="text-gray-500 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur corporis modi placeat sit magni ullam
                        laborum neque incidunt tempora doloremque? Velit qui
                        voluptatibus laborum aliquam.
                    </p>
                    <div className="mt-3">
                        <p className="text-sm mb-2 font-semibold tracking-tighter">
                            If you want to delete, check below
                        </p>
                        <div className="form-control">
                            <label className="label cursor-pointer p-0 justify-normal gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary w-5 h-5 rounded-md"
                                    onChange={handleDisable}
                                />
                                <span className="label-text text-gray-500">
                                    I know what i&apos;m doing
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                        <button
                            type="button"
                            className={`btn text-white py-2 px-4 h-fit min-h-fit text-xs w-full sm:w-fit sm:text-sm ${
                                isDisabled
                                    ? "btn-disabled cursor-not-allowed"
                                    : "btn-error"
                            }`}
                            onClick={() => {
                                isDisabled
                                    ? () => {}
                                    : handlerCampaignDeleteModal();
                            }}
                            disabled={isDisabled}
                        >
                            Delete Campaign
                            <span className="material-symbols-outlined !text-lg !leading-none">
                                delete
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* DELETE MODAL */}
            <ConfirmModal
                modalRef={deleteModal}
                isDanger={true}
                modalDescription="Are you sure want to delete this campaign? This action will permanently delete the campaign"
                modalTitle="Delete Campaign"
                onButtonClick={handlerCampaignDelete}
            />

            <ConfirmModal
                modalRef={finishModal}
                isDanger={true}
                modalDescription="Are you sure want to finish this campaign? This action will end the campaign and show results"
                modalTitle="Finish Campaign"
                onButtonClick={handlerCampaignFinish}
            />
        </>
    );
};

export default SettingTab;
