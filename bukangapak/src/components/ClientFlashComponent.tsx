"use client";

import { useSearchParams } from "next/navigation";
export const dynamic = "force-dynamic";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <p className="animate-pulse rounded bg-red-400 px-4 py-2 text-center">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default ClientFlashComponent;
