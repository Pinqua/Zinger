import {
    ClockIcon,
    LocationMarkerIcon,
    PhoneIcon,
} from "@heroicons/react/solid";

function Info() {
    return (
        <div className="px-6 py-20">
            <div className="flex justify-evenly mx-auto max-w-screen-lg flex-wrap sm:gap-8 gap-10 sm:flex-row flex-col">
                <div className="flex flex-col  items-center gap-2">
                    <div>
                        <ClockIcon className="lg:w-12 w-10 text-primary-light mx-auto " />
                    </div>
                    <h3 className="font-semibold">Today 10am - 7pm</h3>
                    <h4>Working Hours</h4>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div>
                        <LocationMarkerIcon className="lg:w-12 w-10 text-primary-light mx-auto" />
                    </div>
                    <h3 className="font-semibold">Roorkee,Uttrakhand</h3>
                    <h4>Get Directions</h4>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div>
                        <PhoneIcon className="lg:w-12 w-10 text-primary-light mx-auto" />
                    </div>
                    <h3 className="font-semibold">+91 7345679834</h3>
                    <h4>Call Now</h4>
                </div>
            </div>
        </div>
    );
}

export default Info;
