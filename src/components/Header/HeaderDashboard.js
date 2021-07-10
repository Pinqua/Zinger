import Image from "next/image";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";

function HeaderDashboard() {
  const router = useRouter();
  return (
    <header className="sticky top-0 inset-x-0 z-30 bg-white text-gray-900 glassmorphism px-6">
      <div className="flex items-center justify-between w-full max-w-screen-xl py-2 xl:space-x-16 lg:space-x-12  space-x-7  mx-auto">
        <div className="flex items-center lg:w-auto sm:w-24 w-20">
          <Image
            src="/img/Zinger.svg"
            alt="Zinger"
            className="cursor-pointer"
            width={100}
            objectFit="contain"
            height={50}
            onClick={() => router.push("/")}
          />
        </div>
        <div className="font-medium xl:space-x-12  lg:space-x-10 space-x-4 lg:text-base text-sm">
          <span
            className="link"
            onClick={() => router.push("/admin/dashboard")}
          >
            Dashboard
          </span>
          <span className="link" onClick={signOut}>
            Logout
          </span>
        </div>
      </div>
    </header>
  );
}

export default HeaderDashboard;
