import { CheckCircleIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Custom404 from "./404";
import Head from "next/head";

function Success() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (!loading && !session) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>Zinger | Order Placed Successfully</title>
      </Head>
      <div className="bg-gray-100 heightFix flex items-center sm:px-6">
        <main className="max-w-screen-lg mx-auto">
          <div className="flex flex-col md:p-10 sm:p-8 p-6 bg-white shadow-md rounded-md">
            <div className="flex items-center space-x-2 mb-5">
              <CheckCircleIcon className="text-green-500 lg:h-10 md:h-8 h-6" />
              <h1 className="sm:text-2xl xxs:text-xl text-lg font-medium ml-2">
                Order Placed Successfully
              </h1>
            </div>
            <p className="sm:text-base text-sm">
              Thank you for shopping with us. Your order will be delivered soon.
            </p>
            <button
              className="button mt-8 lg:text-lg text-base"
              onClick={() => router.replace("/orders")}
            >
              Go to my orders
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Success;
