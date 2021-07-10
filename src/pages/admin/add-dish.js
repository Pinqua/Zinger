import { useState } from "react";
import axios from "axios";
import NormalToast from "../../util/Toast/NormalToast";
import { connectToDatabase } from "../../util/mongodb";
import getCategories from "../../util/getCategories";
import Head from "next/head";

function AddDish(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(props?.categories[0]?.name);
  const { categories, error } = getCategories(props?.categories);
  const [disabled, setDisabled] = useState(false);

  if (error) {
    console.error(error);
  }

  const formHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post("/api/admin/add-dish", {
        title,
        category,
        description,
        price,
        image,
      })
      .then((res) => {
        NormalToast("Dish added successfully");
        setTitle("");
        setDescription("");
        setPrice("");
        setImage("");
        setCategory("");
        setDisabled(false);
      })
      .catch((err) => {
        NormalToast("Something went wrong", true);
        console.error(err);
        setDisabled(false);
      });
  };

  return (
    <>
      <Head>
        <title>Zinger | Add Dish</title>
      </Head>
      <div className="heightFixAdmin px-6 lg:py-20 sm:py-16 py-12">
        <div className="mx-auto max-w-screen-sm sm:text-base  text-sm ">
          <h2 className="lg:text-4xl sm:text-3xl text-2xl  font-bold mb-6">
            Add Dish
          </h2>
          <form onSubmit={formHandler} className="flex flex-col gap-4">
            <input
              type="text"
              required
              value={title}
              placeholder="Title"
              className="bg-gray-100 py-2 px-4 rounded-md outline-none border border-gray-200"
              onChange={(e) => setTitle(e.target.value)}
              disabled={disabled}
            />
            <select
              required
              className="bg-gray-100 py-2 px-4 rounded-md outline-none border border-gray-200 capitalize"
              onChange={(e) => setCategory(e.target.value)}
              disabled={disabled}
            >
              {categories?.map((category) => (
                <option value={category?.name} key={`option-${category?._id}`}>
                  {category?.name}
                </option>
              ))}
            </select>
            <textarea
              required
              placeholder="Description"
              className="bg-gray-100 border border-gray-200 py-2 px-4 rounded-md resize-none h-24 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="25"
              rows="10"
              disabled={disabled}
            ></textarea>
            <input
              type="number"
              required
              placeholder="Price"
              className="bg-gray-100 border py-2 px-4 rounded-md outline-none border-gray-200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={disabled}
            />
            <input
              type="text"
              required
              placeholder="Image Url"
              className="bg-gray-100 py-2 px-4 border rounded-md outline-none border-gray-200"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={disabled}
            />
            <button
              type="submit"
              className={`button py-2 px-10 sm:text-base text-sm mt-4 ${disabled ? "opacity-50" : ""
                }`}
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

AddDish.admin = true;
export default AddDish;

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();
  let categories = await db.collection("categories").find({}).toArray();
  categories = JSON.parse(JSON.stringify(categories));
  return {
    props: {
      categories,
    },
    revalidate: 1,
  };
};
