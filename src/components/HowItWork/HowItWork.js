import {
  CreditCardIcon,
  CursorClickIcon,
  TruckIcon,
} from "@heroicons/react/solid";

function HowItWork() {
  return (
    <div className="px-6">
      <div className="max-w-screen-xl mx-auto lg:py-20 sm:py-14 py-10">
        <h2 className="heading">How It Works</h2>
        <div className="mt-20">
          <div className="flex sm:justify-evenly text-center sm:gap-4 gap-8 flex-wrap sm:flex-row flex-col">
            <div className="flex flex-col items-center sm:gap-6 gap-4">
              <CursorClickIcon className="sm:w-14 w-10 text-primary-light mx-auto" />
              <h3 className="font-medium sm:text-2xl text-xl">Pick Meal</h3>
              <h4 className="max-w-xs mx-auto sm:text-base text-sm">
                Choose a meal from our diverse weekly menu.
              </h4>
            </div>
            <div className="flex flex-col items-center sm:gap-6 gap-4">
              <CreditCardIcon className="sm:w-14 w-10 text-primary-light mx-auto" />
              <h3 className="font-medium sm:text-2xl text-xl">Checkout</h3>
              <h4 className="max-w-xs mx-auto  sm:text-base text-sm">
                Fill address, all the necessary details and make payment.
              </h4>
            </div>
            <div className="flex flex-col items-center sm:gap-6 gap-4">
              <TruckIcon className="sm:w-14 w-10 text-primary-light mx-auto" />
              <h3 className="font-medium sm:text-2xl text-xl">Fast Delivery</h3>
              <h4 className="mx-auto max-w-xs  sm:text-base text-sm">
                Freshly prepared meal arrive on your doorstep in a refigerated
                box.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWork;
