import { Candidate } from "@/types/candidate.types";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    chief_name: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(30, "Maximum 30 characters")
        .required("Chief name is required"),
    chief_instagram: Yup.string()
        .url("Invalid URL format")
        .required("Chief Instagram is required"),
    vice_name: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(30, "Maximum 30 characters")
        .required("Vice name is required"),
    vice_instagram: Yup.string()
        .url("Invalid URL format")
        .required("Vice Instagram is required"),
    description: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Description is required"),
    visi: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Visi is required"),
    misi: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Misi is required"),
    program: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Program is required"),
    // candidate_banner: Yup.mixed().test("fileSize", "File size is too large", (value) => {
    //   if (!value) return true; // No file uploaded
    //   return value.size <= MAX_FILE_SIZE;
    // }), // uncomment this line if needed
});

interface StepTwoProps {
    index: number;
    handlerNextStep: (formik: any, index: number) => void;
    currentStep: number;
    setCurrentStep: Function;
    candidate?: Candidate;
}

const StepTwo: React.FC<StepTwoProps> = ({
    index,
    handlerNextStep,
    currentStep,
    setCurrentStep,
    candidate,
}) => {
    const { query } = useRouter();
    const formType = query.form;

    const formik = useFormik({
        initialValues: {
            id: formType === "edit" ? candidate?.id : null,
            create_new: formType === "edit" ? true : false,
            candidate_temp_index: index,
            chief_name: candidate?.chief_name ?? "",
            chief_instagram: candidate?.chief_instagram ?? "",
            vice_name: candidate?.vice_name ?? "",
            vice_instagram: candidate?.vice_instagram ?? "",
            description: candidate?.description ?? "",
            visi: candidate?.visi ?? "",
            misi: candidate?.misi ?? "",
            program: candidate?.program ?? "",
        },
        validationSchema,
        onSubmit: () => {},
    });

    useEffect(() => {
        if (candidate) {
            formik.setValues({
                ...formik.values,
                candidate_temp_index: index,
                id: formType === "edit" ? candidate.id : null,
                chief_name: candidate.chief_name ?? "",
                chief_instagram: candidate.chief_instagram ?? "",
                vice_name: candidate.vice_name ?? "",
                vice_instagram: candidate.vice_instagram ?? "",
                description: candidate.description ?? "",
                visi: candidate.visi ?? "",
                misi: candidate.misi ?? "",
                program: candidate.program ?? "",
            });
        }
    }, [candidate]);

    // useEffect(() => {
    //     if (candidate) {
    //         formik.setValues({
    //             ...formik.values,
    //             candidate_temp_index: index,
    //         });

    //         console.log(formik.values);

    //         // setFormValuesSet(true);
    //     }
    // }, [candidate]);

    return (
        <>
            {/* CHIEF */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Chief name</span>
                </div>
                <input
                    type="text"
                    placeholder="Chief name..."
                    className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                    name="chief_name"
                    value={formik.values.chief_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.chief_name && formik.errors.chief_name && (
                    <div className="text-red-500 text-sm">
                        {formik?.errors.chief_name?.toString()}
                    </div>
                )}
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Chief instagram</span>
                </div>
                <input
                    type="url"
                    placeholder="Chief instagram..."
                    className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                    name="chief_instagram"
                    value={formik.values.chief_instagram}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.chief_instagram &&
                    formik.errors.chief_instagram && (
                        <div className="text-red-500 text-sm">
                            {formik?.errors[`chief_instagram`]?.toString()}
                        </div>
                    )}
            </label>
            <div className="divider mt-3" />
            {/* VICE */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Vice name</span>
                </div>
                <input
                    type="text"
                    placeholder="Vice name..."
                    className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                    name="vice_name"
                    value={formik.values.vice_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.vice_name && formik.errors.vice_name && (
                    <div className="text-red-500 text-sm">
                        {formik?.errors.vice_name?.toString()}
                    </div>
                )}
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Vice instagram</span>
                </div>
                <input
                    type="url"
                    placeholder="Vice instagram..."
                    className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full transition-all ease-in-out focus:input-primary"
                    name="vice_instagram"
                    value={formik.values.vice_instagram}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.vice_instagram &&
                    formik.errors.vice_instagram && (
                        <div className="text-red-500 text-sm">
                            {formik?.errors[`vice_instagram`]?.toString()}
                        </div>
                    )}
            </label>
            <div className="divider mt-3" />
            {/* DESCRIPTION */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Description</span>
                </div>
                <textarea
                    className="textarea textarea-bordered h-24 transition-all ease-in-out focus:textarea-primary"
                    placeholder="Candidate Description..."
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">
                        {formik?.errors.description?.toString()}
                    </div>
                )}
            </label>
            {/* VISI */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Visi</span>
                </div>
                <textarea
                    className="textarea textarea-bordered h-24 transition-all ease-in-out focus:textarea-primary"
                    placeholder="Candidate Visi..."
                    name="visi"
                    value={formik.values.visi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.visi && formik.errors.visi && (
                    <div className="text-red-500 text-sm">
                        {formik?.errors.visi?.toString()}
                    </div>
                )}
            </label>
            {/* MISI */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Misi</span>
                </div>
                <textarea
                    className="textarea textarea-bordered h-24 transition-all ease-in-out focus:textarea-primary"
                    placeholder="Candidate Misi..."
                    name="misi"
                    value={formik.values.misi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.misi && formik.errors.misi && (
                    <div className="text-red-500 text-sm">
                        {formik?.errors.misi?.toString()}
                    </div>
                )}
            </label>
            {/* PROGRAM KERJA */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Program Kerja</span>
                </div>
                <textarea
                    className="textarea textarea-bordered h-24 transition-all ease-in-out focus:textarea-primary"
                    placeholder="Candidate Programs..."
                    name="program"
                    value={formik.values.program}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />{" "}
                {formik.touched.program && formik.errors.program && (
                    <div className="text-red-500 text-sm">
                        {formik?.errors.program?.toString()}
                    </div>
                )}
            </label>
            {/* BANNER */}
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Candidate Banner</span>
                </div>
                <input
                    type="file"
                    className="file-input file-input-bordered file-input-md max-h-10 file-input-primary border-gray-300 w-full rounded-b-none"
                    name="candidate_banner"
                    // value={formik.values.candidate_banner}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                />
                {/* {formik.touched.candidate_banner &&
                    formik.errors.candidate_banner && (
                        <div className="text-red-500 text-sm">
                            {formik?.errors?.candidate_banner?.toString()}
                        </div>
                    )} */}
            </label>
            <div className="border border-gray-300 border-t-0 rounded-lg rounded-t-none h-60 flex justify-center items-center">
                <p className="text-center text-gray-500">
                    This is a preview of the image.
                </p>
            </div>

            {/* ACTION BUTTON */}
            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    className="btn btn-outline btn-primary text-white py-2 px-6 text-sm h-fit min-h-fit"
                    onClick={() => {
                        setCurrentStep(currentStep - 1);
                        window.scrollTo(0, 0);
                    }}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="btn btn-primary text-white py-2 px-8 text-sm h-fit min-h-fit"
                    onClick={() => handlerNextStep(formik, index)}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default StepTwo;
