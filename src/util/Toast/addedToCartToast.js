import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { CreditCardIcon } from "@heroicons/react/outline";

const addedToCartToast = (image, title) => {
  toast(
    <div className="flex text-gray-800 gap-4">
      <div className="w-3/12 my-auto">
        <Image
          src={image}
          width={40}
          height={40}
          alt=""
          objectFit="cover"
          className="min-w-max"
        />
      </div>
      <div className="w-full">
        <h3 className="font-bold">Added to cart</h3>
        <p className="text-sm mb-2 capitalize">
          {title.slice(0, 22)}
          {title.length > 22 ? "…" : ""}
        </p>
        <Link href="/cart">
          <button className="px-8 py-2 w-full flex items-center justify-center button">
            <CreditCardIcon className="w-4" /> &nbsp;Checkout
          </button>
        </Link>
      </div>
    </div>,

    {
      position: "top-right",
      autoClose: 6000,
      style: {
        backgroundColor: "white",
        color: "#1f2937",
        fontFamily: "Poppins, sans-serif",
        height: "auto",
      },
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      draggablePercent: 25,
    }
  );
};

export default addedToCartToast;
