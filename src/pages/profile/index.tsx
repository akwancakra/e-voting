import { UploadButton } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";
import Head from "next/head";

const ProfilePage = () => {
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>Profil | E-Voting</title>
      </Head>
      <div>
        <section>
          <p>Hello there, {data?.user?.name}</p>

          <UploadButton
            className="btn btn-primary w-fit"
            appearance={{
              container: {},
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
              console.log(error.message);
            }}
          />
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
