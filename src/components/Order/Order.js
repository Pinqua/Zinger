import moment from "moment";
import { useSession } from "next-auth/client";
import Link from "next/link";
import Currency from "react-currency-formatter";
import axios from "axios";
import { useState } from "react";
import NormalToast from "../../util/Toast/NormalToast";

function Order({ _id, id, amount_total, timestamp, items, status, admin }) {
  const [session, loading] = useSession();
  const [updating, setUpdating] = useState(false);

  const updateStatus = (e) => {
    setUpdating(true);
    axios
      .post("/api/admin/update-order-status", {
        status: e.target.value,
        _id: _id,
      })
      .then(() => {
        setUpdating(false);
      })
      .catch((err) => {
        console.error(err);
        setUpdating(false);
      });
  };
  const cancelOrder = () => {
    axios
      .post("/api/cancel-order", { status: "cancelled", _id: _id })
      .then(() => {
        NormalToast("Order cancelled");
      })
      .catch((err) => {
        console.error(err);
        NormalToast("Something went wrong", true);
      });
  };

  return (
    <div>
      <div className="w-full space-x-2">
        {admin ? (
          status && !loading && session && session?.admin ? (
            <select
              className="border border-b-0 xs:text-sm text-xs p-2 rounded-t-md bg-blue-500 text-white outline-none capitalize"
              value={status}
              disabled={updating}
              onChange={updateStatus}
            >
              <option value="shipping soon">Shipping soon</option>
              <option value="shipped">Shipped</option>
              <option value="out for delivery">Out for delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          ) : (
            <></>
          )
        ) : status ? (
          <div
            className={`border border-b-0 xs:text-sm text-xs px-4 py-2 rounded-t-md  ${status === "cancelled"
                ? "bg-red-500"
                : status !== "delivered"
                  ? "bg-blue-500"
                  : "bg-green-500"
              } text-white inline-block capitalize`}
          >
            {status}
          </div>
        ) : (
          <></>
        )}
        {status && status !== "cancelled" && status !== "delivered" ? (
          <div
            className="button-red border border-b-0 xs:text-sm text-xs px-4 py-2 rounded-t-md rounded-b-none  inline-block  capitalize"
            onClick={cancelOrder}
          >
            Cancel order
          </div>
        ) : (
          <></>
        )}
      </div>
      <Link
        href={`/${admin && session?.admin ? "admin/" : ""}order-details/${_id}`}
      >
        <div
          className={`relative border rounded-md rounded-tl-none cursor-pointer hover:shadow-sm bg-white overflow-hidden ${status && status === "cancelled" ? "opacity-70" : ""
            }`}
          title="Click to view order details"
        >
          <div className="sm:p-6 p-4 bg-gray-100 sm:text-sm text-xs text-gray-600">
            {status && status === "cancelled" ? (
              <p className="mb-2 text-red-500">
                * Money will be refunded within 24 hour
              </p>
            ) : (
              <></>
            )}
            <p className="sm:absolute sm:top-2 sm:right-2 sm:w-56 lg:w-72 truncate text-xs whitespace-nowrap sm:mb-0 mb-2 font-medium">
              ORDER # <span className="text-green-500">{id}</span>
            </p>
            <div className="flex sm:items-center sm:gap-6 gap-1 sm:flex-row flex-col">
              <div className="flex items-center sm:gap-6 gap-4">
                <div>
                  <p className="font-bold text-xs">ORDER PLACED</p>
                  <p>{moment(timestamp).format("DD MMM YYYY")}</p>
                </div>
                <div>
                  <p className="text-xs font-bold">TOTAL</p>
                  <p className="text-xs font-bold text-red-500">
                    <Currency quantity={amount_total} currency="INR" />
                  </p>
                </div>
              </div>
              <p className="lg:text-xl md:text-lg sm:text-base text-sm font-medium  whitespace-nowrap  self-end flex-1 text-right text-blue-500">
                {items?.length} items
              </p>
            </div>
          </div>
          <div className="sm:p-6 p-4">
            <div className="flex space-x-6 overflow-x-auto py-4 hideScrollBar">
              {items?.map((item) => (
                <img
                  key={`item-img-${item?._id}`}
                  className="h-20 object-contain sm:h-32"
                  src={item?.image}
                  alt=""
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Order;
