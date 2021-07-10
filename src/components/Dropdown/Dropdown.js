import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import onClickOutside from "react-onclickoutside";

function Dropdown({ hideDropDown }) {
  const [session] = useSession();
  const router = useRouter();
  Dropdown.handleClickOutside = hideDropDown;
  return (
    <div className="font-medium w-36 bg-white text-sm rounded shadow overflow-hidden border border-gray-100">
      {session && session?.admin && (
        <div
          className="dropDownOption border-b border-gray-200"
          onClick={() => router.push("/admin/dashboard")}
        >
          Dashboard
        </div>
      )}
      <div
        className="dropDownOption border-b border-gray-200"
        onClick={() => router.push("/profile")}
      >
        Profile
      </div>

      <div
        className="dropDownOption border-b border-gray-200"
        onClick={() => router.push("/orders")}
      >
        Orders
      </div>
      <div
        className="dropDownOption border-b border-gray-200"
        onClick={() => router.push("/about")}
      >
        Contact
      </div>
      <div
        className="dropDownOption"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </div>
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
