import type { NextApiRequest, NextApiResponse } from "next";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { getSession } from "next-auth/react";

const f = createUploadthing();

// const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" }); // Fake auth function
const auth = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Get session from next-auth
        const sessionResponse = await fetch(
            "http://localhost:3000/api/auth/session",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: req.headers.cookie || "",
                },
            }
        );

        if (!sessionResponse.ok) {
            throw new Error("Failed to fetch session");
        }

        const session = await sessionResponse.json();

        // Check if session exists and has role 'ADMIN'
        if (session && session.user?.role === "ADMIN") {
            return { email: session.user.email };
        } else {
            throw new Error("Forbidden");
        }
    } catch (error) {
        // Handle any errors that may occur when trying to get the session
        console.error("Error getting session:", error);
        throw new Error("Internal Server Error");
    }
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "1MB" } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req, res }) => {
            // This code runs on your server before upload
            const user = await auth(req, res);

            // If you throw, the user will not be able to upload
            if (!user) throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.email };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// https://docs.uploadthing.com/errors
// https://docs.uploadthing.com/api-reference/react#useuploadthing
