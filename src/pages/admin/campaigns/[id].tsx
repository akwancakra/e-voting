import CandidateCard from "@/components/elements/campaigns/CandidateCard";
import CountdownDetail from "@/components/elements/campaigns/CountdownDetail";
import CountdownPreview from "@/components/elements/campaigns/CountdownPreview";
import RulesCard from "@/components/elements/campaigns/RulesCard";
import PreviewTab from "@/components/elements/campaigns/admin/detail/PreviewTab";
import ResultTab from "@/components/elements/campaigns/admin/detail/ResultTab";
import SettingTab from "@/components/elements/campaigns/admin/detail/SettingTab";
import ConfirmModal from "@/components/elements/modals/ConfirmModal";
import { AllowedEmail } from "@/types/allowedEmail.types";
import { Campaign } from "@/types/campaign.type";
import { Candidate } from "@/types/candidate.types";
import { Rule } from "@/types/rule.types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Head from "next/head";

const AdminDetailCampaignPage = () => {
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState(null);
  const [campaignData, setCampaignData] = useState<Campaign>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("PREVIEW");
  // DIGUNAKAN UNTUK SUBMIT KETIKA PREVIEW MODE
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const confirmGoBackRef = useRef<HTMLDialogElement>(null);
  const confirmSubmitRef = useRef<HTMLDialogElement>(null);

  const { data } = useSession();

  const { query, push, back } = useRouter();
  const campaignId = query.id;
  const campaignIdPreviewMode = query.campaignId;
  const formType = query.formType;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await axios.get(`/api/campaigns?id=${campaignId}`).then((res) => {
        setCampaignData(res.data.campaigns);
        setIsLoading(false);
      });
    } catch (error: any) {
      toast.error(
        error?.response?.status === 500
          ? "Something went wrong"
          : error?.response?.data?.message
      );

      setIsLoading(false);
      push("/admin/campaigns");
    }
  };

  const handleTabClick = (tab: string) => {
    // Mengubah nilai URL ketika tab diklik
    push(`/admin/campaigns/${campaignId}?tab=${tab}`);
    setCurrentTab(tab);
  };

  //! FOR CREATE OR EDIT DATA ONLY
  //! USED ONLY IN PREVIEW MODE
  const handleTimeout = async () => {
    console.log("Countdown timer has reached zero!");
    // Lakukan sesuatu ketika waktu habis
    // handlerCreate();
  };

  const handlerModalCancel = () => {
    confirmGoBackRef.current?.showModal();
  };

  const handlerModalSubmit = () => {
    confirmSubmitRef.current?.showModal();
  };

  const handlerCancelModal = (isConfirmed: boolean) => {
    if (isConfirmed) {
      const path = `/admin/campaigns/a/${formType === "add" ? "add" : "edit"}`;
      const query =
        formType === "add"
          ? { formData: JSON.stringify(campaignData) }
          : {
              id: campaignIdPreviewMode,
              formData: JSON.stringify(campaignData),
            };

      push({
        pathname: path,
        query: query,
      });
    }

    if (confirmGoBackRef.current) {
      confirmGoBackRef.current.close();
    }
  };

  const handlerSubmitModal = (isConfirmed: boolean) => {
    if (isConfirmed) {
      console.log("Confirmed");
      if (formType === "add") {
        handlerCreate();
      } else {
        handlerEdit();
      }
      // Lakukan tindakan setelah konfirmasi
    }

    if (confirmGoBackRef.current) {
      confirmGoBackRef.current.close();
    }
  };

  const handlerCreate = async () => {
    setIsSubmitting(true);
    try {
      await axios
        .post(`/api/campaigns/admin/create`, campaignData)
        .then((res) => {
          toast.success(res.data.message);

          setPreviewMode(false);
          setIsSubmitting(false);
          push(`/admin/campaigns/${res.data.data.campaignId}`);
        });
    } catch (error: any) {
      console.log(error);
      // toast.error(error?.response?.data?.message || error?.message);
      setIsSubmitting(false);
    }
  };

  const handlerEdit = async () => {
    setIsSubmitting(true);
    try {
      // BEFORE EDIT, CHECK IF SOME CANDIDATE IS CREATE_NEW == TRUE
      // IF IT IS CREATE_NEW, REMOVE THE CANDIDATE ID FROM THE ARRAY
      const fincalCandidate = campaignData?.candidates?.map(
        (candidate: any) => {
          if (candidate?.create_new && candidate?.id) {
            return {
              ...candidate,
              id: null,
            };
          }
          return candidate; // Add a default return value
        }
      );

      const finalCampaignData = {
        ...campaignData,
        candidates: fincalCandidate,
      };

      await axios
        .post(`/api/campaigns/admin/edit`, {
          id: campaignIdPreviewMode,
          campaignData: finalCampaignData,
        })
        .then((res) => {
          toast.success(res.data.message);

          setPreviewMode(false);
          setIsSubmitting(false);
          push(`/admin/campaigns/${campaignIdPreviewMode}`);
        });
    } catch (error: any) {
      console.log(error);
      // toast.error(error?.response?.data?.message || error?.message);
      setIsSubmitting(false);
    }
  };
  //! FOR CREATE OR EDIT DATA ONLY

  useEffect(() => {
    if (typeof campaignId === "string" && campaignId === "preview") {
      const formData = query?.formData
        ? JSON.parse(query.formData as string)
        : {};

      console.log(campaignId);

      if (formData && formData?.title) {
        setPreviewMode(true);
        setCampaignData(formData);
        console.log(formData);
      } else {
        console.log(formData);
        toast.error("There's data found in the query string");
        back();
      }
    } else if (campaignId && !isNaN(parseInt(campaignId as string))) {
      const tabFromQuery = query.tab;
      if (
        tabFromQuery === "PREVIEW" ||
        tabFromQuery === "RESULT" ||
        tabFromQuery === "SETTING"
      ) {
        setCurrentTab(tabFromQuery as string);
      }

      fetchData();
    } else if (campaignId) {
      toast.error("Invalid campaign id");
      push("/admin/campaigns");
    }
  }, [campaignId]);

  return (
    <>
      <Head>
        <title>Admin - Detail Campaign | E-Voting</title>
      </Head>
      {!previewMode ? (
        <div className="flex mb-5">
          <div
            className={`px-1 pb-2${
              currentTab === "PREVIEW" ? " border-b-2 border-black" : ""
            }`}
          >
            <button
              type="button"
              className={`tracking-tighter leading-none cursor-pointer rounded-md py-2 px-3 transition-all ease-in-out hover:bg-gray-300${
                currentTab === "PREVIEW" ? " font-semibold" : ""
              }`}
              onClick={() => handleTabClick("PREVIEW")}
            >
              Preview
            </button>
          </div>
          <div
            className={`px-1 pb-2${
              currentTab === "RESULT" ? " border-b-2 border-black" : ""
            }`}
          >
            <button
              type="button"
              className={`tracking-tighter leading-none cursor-pointer rounded-md py-2 px-3 transition-all ease-in-out hover:bg-gray-300${
                currentTab === "RESULT" ? " font-semibold" : ""
              }`}
              onClick={() => handleTabClick("RESULT")}
            >
              Result
            </button>
          </div>
          <div
            className={`px-1 pb-2${
              currentTab === "SETTING" ? " border-b-2 border-black" : ""
            }`}
          >
            <button
              type="button"
              className={`tracking-tighter leading-none cursor-pointer rounded-md py-2 px-3 transition-all ease-in-out hover:bg-gray-300${
                currentTab === "SETTING" ? " font-semibold" : ""
              }`}
              onClick={() => handleTabClick("SETTING")}
            >
              Settings
            </button>
          </div>
        </div>
      ) : (
        <div className="toast toast-end z-10 w-[calc(100%_-_78px)] transition-all duration-[0.5s] ease-[ease] left-[78px] group-[.open]:w-[calc(100%_-_250px)] group-[.open]:left-[250px]">
          <div className="alert alert-info sm:grid-cols-3 rounded-lg gap-2 border-primary bg-purple-50">
            <span className="sm:flex items-center gap-3">
              <span className=" bg-purple-600 p-2 rounded-md h-10 w-10">
                <span className="material-symbols-outlined leading-none text-white">
                  preview
                </span>
              </span>
              <span>
                <p className="font-semibold tracking-tighter -mb-1">
                  Preview Mode
                </p>
                <p className="text-sm text-gray-500">
                  You&apos;re in preview mode
                </p>
              </span>
            </span>
            <span className="w-full text-center">
              <p className="font-semibold tracking-tighter -mb-1">
                Auto submit in
              </p>
              <CountdownPreview
                minutes={1}
                seconds={30}
                onTimeout={handleTimeout}
                setIsSubmitting={setIsSubmitting}
              />
            </span>
            <span className="sm:flex justify-end items-end w-full">
              <button
                type="button"
                onClick={handlerModalCancel}
                disabled={isSubmitting}
                className="btn btn-outline btn-neutral py-1.5 px-3 text-sm h-fit min-h-fit me-2"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlerModalSubmit}
                className="btn btn-primary py-1.5 px-3 text-sm h-fit min-h-fit"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </span>
          </div>
        </div>
      )}

      {currentTab === "PREVIEW" && campaignData && (
        <PreviewTab
          campaignData={campaignData}
          isLoading={isLoading}
          previewMode={previewMode}
          data={data}
        />
      )}

      {!previewMode && currentTab === "RESULT" && campaignData && (
        <ResultTab
          campaignData={campaignData}
          isLoading={isLoading}
          data={data}
        />
      )}

      {!previewMode && currentTab === "SETTING" && campaignData && (
        <SettingTab
          campaignData={campaignData}
          isLoading={isLoading}
          data={data}
        />
      )}

      {previewMode && (
        <>
          <ConfirmModal
            onButtonClick={handlerCancelModal}
            modalRef={confirmGoBackRef}
            isDanger={true}
          />

          <ConfirmModal
            onButtonClick={handlerSubmitModal}
            modalRef={confirmSubmitRef}
          />
        </>
      )}
    </>
  );
};

export default AdminDetailCampaignPage;
