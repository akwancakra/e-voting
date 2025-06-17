interface StepOneProps {
    formik: any;
    allowedEmails: any; // [{ value: string }];
    setAllowedEmails: Function;
    // generateInitialValues: (numberOfCandidates: number) => any;
}

const StepOne: React.FC<StepOneProps> = ({
    formik,
    allowedEmails,
    setAllowedEmails,
    // generateInitialValues,
}) => {
    const handleCreateEmailInput = () => {
        setAllowedEmails([...allowedEmails, { email: "" }]);
    };

    const handleRemoveEmailInput = (index: number) => {
        setAllowedEmails(
            allowedEmails.filter((_: any, i: number) => i !== index)
        );
    };

    return (
        <>
            {/* TITLE */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Title</span>
                </div>
                <input
                    name="title"
                    type="text"
                    placeholder="Campaign title..."
                    className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm">
                        {formik.errors.title.toString()}
                    </div>
                )}
            </label>
            {/* DESCRIPTION */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Description</span>
                </div>
                <textarea
                    name="description"
                    className="textarea textarea-bordered h-24 transition-all ease-in-out focus:textarea-primary"
                    placeholder="Description..."
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">
                        {formik.errors.description.toString()}
                    </div>
                )}
            </label>
            {/* BANNER */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Campaign Banner</span>
                </div>
                <input
                    name="campaign_banner"
                    type="file"
                    className="file-input file-input-bordered file-input-md max-h-10 file-input-primary border-gray-300 w-full rounded-b-none"
                    value={formik.values.campaign_banner}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </label>
            <div className="border border-gray-300 border-t-0 rounded-lg rounded-t-none h-60 flex justify-center items-center">
                <p className="text-center text-gray-500">
                    This is a preview of the image.
                </p>
            </div>
            {formik.touched.campaign_banner &&
                formik.errors.campaign_banner && (
                    <div className="text-red-500 text-sm">
                        {formik.errors.campaign_banner.toString()}
                    </div>
                )}

            {/* ALLOWED EMAILS */}
            <div className="alert border border-primary bg-purple-100 text-purple-800 py-3.5 mt-3 w-full text-sm rounded-lg">
                <span className="material-symbols-outlined text-lg pr-2">
                    info
                </span>
                <p className="mb-0.5">
                    <b>FYI</b>: Allowed emails should be in the format like{" "}
                    <b>domain.com</b>
                </p>
            </div>

            {allowedEmails?.map((email: { email: string }, index: number) => (
                <div className="relative mb-2" key={index}>
                    <label className="form-control w-full">
                        {index == 0 && (
                            <div className="label">
                                <span className="label-text">
                                    Allowed emails
                                </span>
                            </div>
                        )}

                        <input
                            name={`allowed_emails_${index}`}
                            type="text"
                            placeholder="domain.com"
                            value={email.email || ""}
                            onChange={(e) => {
                                const updatedEmails: any = [...allowedEmails];
                                updatedEmails[index].email = e.target.value;
                                setAllowedEmails(updatedEmails);
                            }}
                            className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                        />
                    </label>
                    {allowedEmails.length == index + 1 ? (
                        <span
                            className="flex justify-center items-center border border-gray-300 rounded-full px-1.5 py-0.5 h-fit w-fit absolute right-2 bottom-1 cursor-pointer transition-all ease-in-out hover:bg-purple-200 hover:text-purple-500"
                            onClick={() => handleCreateEmailInput()}
                        >
                            <span className="material-symbols-outlined !text-base">
                                add
                            </span>
                        </span>
                    ) : (
                        <span
                            className="flex justify-center items-center border border-gray-300 rounded-full px-1.5 py-0.5 h-fit w-fit absolute right-2 bottom-1 cursor-pointer transition-all ease-in-out hover:bg-red-200 hover:text-red-500"
                            onClick={() => handleRemoveEmailInput(index)}
                        >
                            <span className="material-symbols-outlined !text-base">
                                close
                            </span>
                        </span>
                    )}
                </div>
            ))}
            {formik.touched.allowed_emails && formik.errors.allowed_emails && (
                <div className="text-red-500 text-sm">
                    {formik.errors.allowed_emails.toString()}
                </div>
            )}

            {/* NUMBER OF CANDIDATES */}
            <label className="form-control w-full mb-4">
                <div className="label">
                    <span className="label-text">
                        Number of candidates{" "}
                        <span className="text-xs text-gray-500">
                            (Max 6 candidates)
                        </span>
                    </span>
                </div>
                <input
                    name="number_of_candidates"
                    type="number"
                    min={1}
                    max={6}
                    placeholder="Campaign title..."
                    className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                    value={formik.values.number_of_candidates}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.number_of_candidates &&
                    formik.errors.number_of_candidates && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.number_of_candidates.toString()}
                        </div>
                    )}
            </label>
        </>
    );
};

export default StepOne;
