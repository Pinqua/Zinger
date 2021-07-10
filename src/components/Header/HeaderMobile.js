import { useState } from "react";
import Image from "next/image";
import { MenuIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/cartSlice";
import SideBarMenu from "../SideBarMenu/SideBarMenu";

function HeaderMobile() {
  const router = useRouter();
  const items = useSelector(selectItems);
  const [showSideBar, setShowBar] = useState(false);

  return (
    <>
      <header className="sticky top-0 inset-x-0 z-30 bg-white text-gray-900 glassmorphism px-6 md:hidden block py-4 transition-all">
        <div className="flex items-center w-full justify-between  mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <MenuIcon className="w-8" onClick={() => setShowBar(true)} />
            </div>
            <div className="flex items-center">
              <Image
                src="/img/Zinger.svg"
                alt="Zinger"
                className="cursor-pointer"
                width={75}
                objectFit="contain"
                height={35}
                onClick={() => router.push("/")}
              />
            </div>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCartIcon className="xl:w-10 w-9 link" />
            <div className="absolute -top-2 -right-1 rounded-full text-white bg-primary-light p-1 flex items-center justify-center text-xs font-extrabold">
              {items?.length}
            </div>
          </div>
        </div>
      </header>
      <div
        className={`z-40 fixed inset-y-0 left-0 overflow-hidden transition-all duration-300  shadow-2xl  ${showSideBar ? "translate-x-0" : "-translate-x-full"
          }
          `}
      >
        <SideBarMenu closeSideBar={() => setShowBar(false)} />
      </div>
    </>
  );
}

export default HeaderMobile;
