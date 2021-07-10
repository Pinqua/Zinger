import { useState } from "react";
import axios from "axios";
import NormalToast from "../../util/Toast/NormalToast";
import Head from "next/head";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [disabled, setDisabled] = useState(false);

  const formHandler = (e) => {
    setDisabled(true);
    e.preventDefault();
    axios
      .post("/api/admin/add-category", { name: categoryName })
      .then(() => {
        NormalToast("Category added successfully");
        setCategoryName("");
        setDisabled(false);
      })
      .catch((err) => {
        console.error(err);
        NormalToast("Something went wrong", true);
        setDisabled(false);
      });
  };

  return (
    <>
      <Head>
        <title>Zinger | Add Category</title>
      </Head>
      <div className="heightFixAdmin px-6 lg:py-28 py-24">
        <div className="mx-auto max-w-screen-sm sm:text-base  text-sm">
          <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-6">
            Add Category
          </h2>
          <form onSubmit={formHandler} className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Enter category name"
              className="bg-gray-100 py-2 border border-gray-200  px-4 rounded-md outline-none"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={disabled}
            />
            <button
              className={`button pt-2 px-10 sm:text-base text-sm ${disabled ? "opacity-50" : ""
                }`}
              type="submit"
              disabled={disabled}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

AddCategory.admin = true;
export default AddCategory;
