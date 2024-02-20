"use client";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center flex-col gap-3">
      <h1 className="color-text text-2xl font-bold">Something Went Wrong.</h1>
      <h1 className="color-text text-xl">
        The page may not exist or an error occured.
      </h1>
      <button
        onClick={() => router?.back()}
        className="px-3 py-1.5 bg-purple-500 rounded-md hover:scale-105 text-white font-medium"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
