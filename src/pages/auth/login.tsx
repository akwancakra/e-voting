import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "sonner";

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { push, query } = useRouter();

    const callbackUrl: any = query?.callbackUrl || "/";

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const res: any = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                    callbackUrl,
                });
                // .then(() => );
                if (!res?.error) {
                    setIsLoading(false);
                    toast.success("Log In successfully");
                    push(callbackUrl);
                } else {
                    setIsLoading(false);
                    if (res?.status === 401) {
                        toast.error("Email or password is incorrect");
                    } else {
                        toast.error("Something went wrong");
                    }
                }

                setIsLoading(false);
            } catch (error: any) {
                if (error.status === 401) {
                    toast.error("Email or password is incorrect");
                } else {
                    toast.error("Something went wrong");
                }

                setIsLoading(false);
            }
        },
    });

    return (
        <section className="min-h-screen flex items-center justify-center sm:bg-gray-100">
            <div className="container mx-auto bg-white px-4 py-16 sm:border-gray-300 sm:rounded-lg sm:border sm:w-96">
                <form onSubmit={formik.handleSubmit}>
                    <div className="text-center">
                        <p className="font-semibold text-2xl tracking-tighter">
                            Hello There
                        </p>
                        <p>Login and access all the features</p>
                    </div>

                    {/* {message ? (
                        <div className="alert border border-warning bg-yellow-100 text-yellow-800 py-3.5 my-3 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{message}</span>
                        </div>
                    ) : (
                        <div className="my-5"></div>
                    )} */}

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@mail.com"
                            className="input input-primary input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="password here..."
                            className="input input-primary input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </label>
                    <button
                        className="btn btn-primary mt-4 p-3 min-h-[2.5rem] h-10 w-full"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>
                {/* DIVIDER */}
                <div className="divider">Or</div>
                {/* DIVIDER */}
                <button
                    className="btn btn-outline w-full border-gray-500 text-gray-500 px-3 py-2 min-h-[2.5rem] h-10 hover:bg-transparent hover:text-gray-700"
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                        signIn("google", {
                            callbackUrl,
                            redirect: false,
                        })
                    }
                >
                    {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                className="fill-gray-500 hover:fill-gray-700 me-1"
                            >
                                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                            </svg>
                            Log In with Google
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default LoginPage;
