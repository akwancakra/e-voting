import { useRef } from "react";

export default function CustomOverlay({ visible = false }) {
    const dotsRef = useRef(null);

    return (
        <div
            className={`${
                !visible ? "hidden invisible " : ""
            }fixed top-0 left-0 w-full h-full bg-transparent z-[100]`}
        >
            <div className="w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="text-white text-center flex flex-col justify-center items-center">
                    <div className="loading loading-ring loading-md"></div>
                    <p className="mt-2 animated-text">
                        Wait a moment
                        <span ref={dotsRef}>...</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
