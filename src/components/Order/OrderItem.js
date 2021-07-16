import Image from "next/image";
import Currency from "react-currency-formatter";

function OrderItem({ item }) {
    return (
        <div className="flex sm:flex-row flex-col-reverse my-4 text-sm text-gray-700 p-6 border border-gray-200 sm:justify-between gap-6">
            <div>
                <span className="font-semibold capitalize">{item?.title}</span>
                <div className="mt-2">
                    <p>
                        <span>Quantity - </span>
                        {item?.qty}
                    </p>
                    <p className="font-semibold">
                        <span className="font-normal">Price - </span>
                        <Currency quantity={item?.price} currency="INR" />
                    </p>
                </div>
            </div>
            <div className="sm:mx-0 sm:ml-6 min-w-max my-auto mx-auto">
                <Image
                    src={item?.image}
                    width={120}
                    height={120}
                    alt=""
                    objectFit="contain"
                />
            </div>
        </div>
    );
}

export default OrderItem;
