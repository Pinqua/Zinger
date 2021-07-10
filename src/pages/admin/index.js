import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <>
      <Head>
        <title>Zinger | Admin Panel</title>
      </Head>
      <div className="heightFixAdmin px-6 flex items-center justify-center">
        <div className="max-w-screen-xs mx-auto lg:text-lg xs:text-base text-sm text-center font-medium text-primary-light">
          Welcome to Admin Panel
          <br />
          Wait while redirecting to Dashboard
        </div>
      </div>
    </>
  );
}

Admin.admin = true;
export default Admin;
