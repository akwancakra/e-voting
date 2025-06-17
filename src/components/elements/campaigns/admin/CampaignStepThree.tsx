import { useRouter } from "next/router";
import React from "react";

interface StepThreeProps {
    formik: any;
}

const StepThree: React.FC<StepThreeProps> = ({ formik }) => {
    // const [deadline, setDeadline] = useState("");
    // const [shuffleCandidate, setShuffleCandidate] = useState(false);
    const { query } = useRouter();
    const formType = query.form;
    // const handleDataSubmit = () => {
    //     const data = {
    //         deadline,
    //         shuffleCandidate,
    //     };
    //     onFinalDataReceived(data);
    // };

    return (
        <>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Deadline</span>
                </div>
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                        name="campaign_date"
                        value={formik.values.campaign_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <input
                        type="time"
                        className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-1/3 transition-all ease-in-out focus:input-primary"
                        name="campaign_time"
                        value={formik.values.campaign_time}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.campaign_date &&
                    formik.errors.campaign_date && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.campaign_date.toString()}
                        </div>
                    )}
                {formik.touched.campaign_time &&
                    formik.errors.campaign_time && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.campaign_time.toString()}
                        </div>
                    )}
            </label>
            {formType === "add" && (
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Shuffle Candidate</span>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">
                                This will make candidate get a random number
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                name="shuffle_candidate"
                                value={formik.values.shuffle_candidate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </label>
                    </div>
                </label>
            )}
        </>
    );
};

export default StepThree;
