import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StepOne from "@/components/elements/campaigns/admin/CampaignStepOne";
import StepTwo from "@/components/elements/campaigns/admin/CampaignStepTwo";
import StepThree from "@/components/elements/campaigns/admin/CampaignStepThree";
import axios from "axios";
import { Campaign } from "@/types/campaign.type";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .matches(/^[a-zA-Z0-9\s]+$/, "Only alphanumeric characters are allowed")
        .min(3, "Title/Summary minimum 3 characters")
        .max(35, "Title/Summary cannot exceed 30 characters")
        .required("Title/Summary is required"),
    description: Yup.string()
        .min(3, "Description minimum 3 characters")
        .required("Description is required"),
    number_of_candidates: Yup.number()
        .min(1, "Minimum 1 candidate")
        .max(6, "Maximum 6 candidate")
        .required("Number of candidates is required"),
    // campaign_banner: Yup.string().required("Banner is required"),
    campaign_date: Yup.date()
        .min(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "Date must be greater than or equal to today"
        )
        .required("Date is required"),
    campaign_time: Yup.string().required("Time is required"),
});

const ActionCampaignPage = () => {
    const [allowedEmails, setAllowedEmails] = useState([{ email: "upi.edu" }]);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [totalStep, setTotalStep] = useState<number>(2);
    const [candidates, setCandidates] = useState<any>([]);

    const { query, push } = useRouter();
    const campaignId = parseInt(query.id as string);
    const formType = query.form;
    const formData = query?.formData
        ? JSON.parse(query.formData as string)
        : null;

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            // campaign_banner: "",
            number_of_candidates: 1,
            campaign_date: "",
            campaign_time: "",
            shuffle_candidate: false,
        },
        validationSchema,
        onSubmit: async (values) => {
            // INIT DATE DATAS
            const today = new Date();
            const date = new Date(
                `${values.campaign_date}T${values.campaign_time}`
            );

            // CHECK THE DATE AND TIME
            if (today > date) {
                toast.error("Date and Time cannot be in the past");
                return;
            }

            // CHECK THE ALL OF ALLOWEDEMAILS IS VALID DOMAIN
            // CHECK IF ALL EMAILS ARE VALID DOMAINS
            const filteredEmails = allowedEmails.filter(
                (email) => email.email != ""
            );

            // CHECK IF ALL EMAILS ARE VALID DOMAINS
            const isValidDomain = (email: string) => {
                const domainRegex =
                    /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
                return domainRegex.test(email);
            };

            // CHECK IF ALL EMAILS ARE VALID DOMAINS
            const isValidEmails = filteredEmails.every((email) =>
                isValidDomain(email.email)
            );

            if (!isValidEmails) {
                // Handle invalid emails
                formik.setFieldError(
                    "allowed_emails",
                    "Invalid email domains found"
                );
                toast.error("Please check the allowed email domains");
                return;
            }

            // CHECK THE TOTAL CANDIDATES, IF ITS SAME AS NUMBER OF CANDIDATES
            if (candidates.length !== values.number_of_candidates) {
                console.log(candidates.length);
                console.log(values.number_of_candidates);
                // return
                toast.error(
                    "The total number of candidates must be the same as the number of candidates"
                );
                return;
            }

            let finalCandidates: any[] = [];
            if (formType === "add" && values.shuffle_candidate) {
                // Create an array of candidate numbers
                let candidateNumbers = Array.from(
                    { length: values.number_of_candidates },
                    (_, index) => index + 1
                );

                // Fisher-Yates (Knuth) shuffle algorithm
                for (let i = candidateNumbers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [candidateNumbers[i], candidateNumbers[j]] = [
                        candidateNumbers[j],
                        candidateNumbers[i],
                    ];
                }

                // You can use candidateNumbers array as needed, for example, assign them to candidates
                for (let i = 0; i < candidateNumbers.length; i++) {
                    const candidateNumber = candidateNumbers[i];
                    const candidate = {
                        ...candidates[i],
                        id: candidates[i].id || null,
                        number: candidateNumber,
                    };
                    finalCandidates.push(candidate);
                }
            } else {
                for (let i = 0; i < values.number_of_candidates; i++) {
                    const candidate = {
                        ...candidates[i],
                        id:
                            candidates[i].id || formType === "edit"
                                ? i + 1
                                : null,
                        number: i + 1,
                    };

                    finalCandidates.push(candidate);
                }
            }

            // AFTER GET THE NUMBER FOR THE CANDIDATES, THEN SORT BY ITS NUMBER
            finalCandidates.sort((a, b) => a.number - b.number);

            // IF ALL DATA HAS VALIDATED, THEN GROUP ALL OF THEM
            const campaignData = {
                ...values,
                id: campaignId || 0,
                title: values.title,
                description: values.description,
                expiredAt: date.toISOString(),
                createdAt: new Date().toISOString(),
                allowedEmails: filteredEmails,
                candidates: finalCandidates,
                finished: false,
                winner_candidate: null,
                totalVotes: 0,
                notifsGroupedByDate: {},
                userVoteCampaign: [],
                notifs: [],
                rules: [],
                result: {},
            };

            const query =
                formType === "add"
                    ? { formData: JSON.stringify(campaignData), formType }
                    : {
                          campaignId,
                          formData: JSON.stringify(campaignData),
                          formType,
                      };

            push({
                pathname: "/admin/campaigns/preview",
                query: query,
            });

            // push({
            //     pathname: `/admin/campaigns/preview?form=${
            //         formType === "add" ? "add" : `edit&id=${campaignId}`
            //     }`,
            //     query: { formData: JSON.stringify(campaignData) },
            // });
        },
    });

    const handlerNextStep = (formikC: any, index?: number) => {
        if (currentStep === 1) {
            const { title, description, number_of_candidates } = formikC.values;

            const errorKeys = Object.keys(formikC.errors).filter(
                (key) => key !== "campaign_date" && key !== "campaign_time"
            );

            const isFormValid =
                title &&
                description &&
                number_of_candidates > 0 &&
                number_of_candidates <= 6 &&
                errorKeys.length === 0;

            if (isFormValid) {
                setCurrentStep((prev) => prev + 1);
                window.scrollTo(0, 0);
            } else {
                toast.error("Please fill in the required fields");
            }
        } else if (currentStep === totalStep) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo(0, 0);
        } else if (
            currentStep !== 1 &&
            currentStep !== totalStep &&
            index !== undefined &&
            index >= 0
        ) {
            // INITIALIZE VARIABLES
            const errorKeys = Object.keys(formikC.errors).filter(
                (key) => !(formType === "add" && key === "id")
            );
            const values = Object.keys(formikC.values);
            const defaultValues = Object.values(formikC.initialValues);

            // UBAH DISINI KALO UDAH ADA FORMDATA, YA LANJUT AJA
            // IF NUMBER OF CANDIDATES IS EQUAL TO TOTAL OF CANDIDATES
            let hasDefaultValues: any = false;
            if (formik.values.number_of_candidates !== candidates.length) {
                // Check if there are any default values
                hasDefaultValues = defaultValues.some((value, index) => {
                    if (
                        values[index] === "candidate_temp_index" ||
                        values[index] === "id" ||
                        values[index] === "create_new"
                    ) {
                        return false;
                    }
                    const currentValue = formikC.values[values[index]];
                    return currentValue === value;
                });
            }

            if (hasDefaultValues || errorKeys.length !== 0) {
                // Form is not valid OR has default values
                toast.error("Please fill in the required fields");
            } else {
                // Form is valid, THEN CHECK IF CANDIDATE ALREADY EXISTS
                let existingCandidateIndex;

                if (formType === "add") {
                    // Jika formType adalah "add", cari berdasarkan candidate_temp_index
                    existingCandidateIndex = candidates.findIndex(
                        (candidate: any) =>
                            candidate.candidate_temp_index === index
                    );
                } else {
                    // Jika formType adalah "edit", cari berdasarkan indeks langsung
                    existingCandidateIndex = index;
                }

                if (existingCandidateIndex !== -1) {
                    // Candidate already exists, update it
                    const updatedCandidates = [...candidates];
                    updatedCandidates[existingCandidateIndex] = formikC.values;
                    setCandidates(updatedCandidates);
                    toast.success("Candidate updated successfully");
                } else {
                    // Candidate doesn't exist, add it
                    setCandidates([...candidates, formikC.values]);
                }

                // GO TO NEXT STEP
                setCurrentStep((prev) => prev + 1);
                window.scrollTo(0, 0);
            }
        }
    };

    useEffect(() => {
        if (formType) {
            const isInvalidFormType = formType !== "add" && formType !== "edit";
            const isInvalidCampaignId = isNaN(campaignId) || campaignId <= 0;

            console.log(formType, campaignId);
            if (
                isInvalidFormType ||
                (isInvalidCampaignId && formType !== "add")
            ) {
                toast.error("Invalid form or campaign information");
                // Optionally, add a comment explaining the use of push
                push("/admin/campaigns");
            } else if (formType === "edit" && !formData) {
                const fetchData = async () => {
                    try {
                        await axios
                            .get(`/api/campaigns?id=${campaignId}`)
                            .then((res) => {
                                const campaign: Campaign = res.data.campaigns;

                                const expiredDate = new Date(
                                    campaign.expiredAt
                                );
                                const expiredDateString = `${expiredDate.getFullYear()}-${(
                                    expiredDate.getMonth() + 1
                                )
                                    .toString()
                                    .padStart(2, "0")}-${expiredDate
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}`;
                                const expiredTimeString =
                                    expiredDate.toLocaleTimeString();

                                formik.setValues({
                                    title: campaign.title,
                                    description: campaign.description,
                                    number_of_candidates:
                                        campaign.candidates.length || 1,
                                    campaign_date: expiredDateString,
                                    campaign_time: expiredTimeString,
                                    shuffle_candidate: false,
                                });

                                setAllowedEmails(campaign.allowedEmails);
                                setCandidates(campaign.candidates);
                            });
                    } catch (error: any) {
                        toast.error(
                            error?.response?.data?.message || error?.message
                        );
                    }
                };

                fetchData();
            }
        }
    }, [formType, campaignId]);

    useEffect(() => {
        if (formData) {
            // IF FORM DATA IS EXIST THEN SET TO FORMIK AND OTHER COMPONENTS THAT NEED THE DATA
            formik.setValues({
                title: formData.title,
                description: formData.description,
                number_of_candidates: formData.number_of_candidates,
                campaign_date: formData.campaign_date,
                campaign_time: formData.campaign_time,
                shuffle_candidate: formData.shuffle_candidate,
            });

            // SET TO ALLOWED EMAILS
            setAllowedEmails(formData.allowedEmails);

            // SET TO CANDIDATES
            setCandidates(formData.candidates);

            console.log(formData);
        }
    }, [query?.formData]);

    useEffect(() => {
        setTotalStep(2 + formik.values.number_of_candidates);
    }, [formik.values.number_of_candidates]);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <section className="mx-auto max-w-6xl bg-pimary-dpurple rounded-xl p-4 min-h-28 mb-4">
                    <p className="tracking-tighter font-semibold text-white text-lg">
                        Create new campaign
                    </p>
                </section>

                <section className="mx-auto max-w-6xl min-h-full">
                    <div className="badge badge-outline mb-2">
                        {currentStep}/{totalStep}
                    </div>
                </section>

                <div className={`${currentStep === 1 ? "block" : "hidden"}`}>
                    <section className="mx-auto max-w-6xl min-h-full">
                        {/* <div className="badge badge-outline mb-2">1/3</div> */}
                        <h1 className="card-title tracking-tighter text-lg sm:text-2xl">
                            Campaign datas
                        </h1>

                        <div className="md:w-1/2">
                            <StepOne
                                formik={formik}
                                allowedEmails={allowedEmails}
                                setAllowedEmails={setAllowedEmails}
                                // generateInitialValues={generateInitialValues}
                            />

                            {/* ACTION BUTTON */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline btn-primary text-white py-2 px-6 text-sm h-fit min-h-fit"
                                    onClick={() => {
                                        const confirmCancel = window.confirm(
                                            "Are you sure you want to cancel? Progress will not be saved."
                                        );
                                        if (confirmCancel) {
                                            push("/admin/campaigns");
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlerNextStep(formik)}
                                    className="btn btn-primary text-white py-2 px-8 text-sm h-fit min-h-fit"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {Array.from({ length: formik.values.number_of_candidates }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className={`${
                                currentStep === index + 2 ? "block" : "hidden"
                            }`}
                        >
                            <section className="mx-auto max-w-6xl min-h-full">
                                <h1 className="card-title tracking-tighter text-lg sm:text-2xl">
                                    Canidate datas
                                </h1>

                                <div className="flex items-center gap-2 my-3">
                                    <div className="flex justify-center items-center rounded-lg bg-primary text-white p-2 w-8 h-8">
                                        <p className="font-semibold">
                                            {index + 1}
                                        </p>
                                    </div>
                                    <p>Candidate {index + 1}</p>
                                </div>
                                <div className="md:w-1/2">
                                    <StepTwo
                                        key={index}
                                        index={index}
                                        candidate={candidates[index]}
                                        handlerNextStep={handlerNextStep}
                                        currentStep={currentStep}
                                        setCurrentStep={setCurrentStep}
                                    />
                                </div>
                            </section>
                        </div>
                    )
                )}

                <div
                    className={`${
                        currentStep === totalStep ? "block" : "hidden"
                    }`}
                >
                    <section className="mx-auto max-w-6xl min-h-full">
                        {/* <div className="badge badge-outline mb-2">3/3</div> */}
                        <h1 className="card-title tracking-tighter text-lg sm:text-2xl">
                            Final Datas
                        </h1>

                        <div className="md:w-1/2">
                            {/* DATETIME */}
                            <StepThree formik={formik} />
                            {/* ACTION BUTTON */}
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-outline btn-primary text-white py-2 px-6 text-sm h-fit min-h-fit"
                                    onClick={() => {
                                        setCurrentStep(totalStep - 1);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary text-white py-2 px-8 text-sm h-fit min-h-fit"
                                    onClick={formik.submitForm}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </form>
        </>
    );
};

export default ActionCampaignPage;
