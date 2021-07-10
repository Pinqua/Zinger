import { useState } from "react";
import { connectToDatabase } from "../../util/mongodb";
import getDishes from "../../util/getDishes";
import Head from "next/head";
import DishInfo from "../../components/Dish/DishInfo";

function Dishes(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const { dishes, error } = getDishes(props?.dishes);
  const [searchResult, setSearchResult] = useState(dishes);
  const options = {
    keys: ["title", "description", "category"],
  };

  if (error) {
    console.error(error);
  }

  const searchDish = async (e) => {
    let term = e.target.value;
    setSearchTerm(term);
    term = term.toLowerCase();
    // Dynamically load fuse.js
    const Fuse = (await import("fuse.js")).default;
    const fuse = new Fuse(dishes ? dishes : [], options);
    const result = fuse
      .search(term)
      .map(({ item: { _id, title, price, description, category, image } }) => ({
        _id,
        title,
        price,
        description,
        category,
        image,
      }));
    setSearchResult(result);
  };

  const removeFromSearchResults = (_id) => {
    setSearchResult((dishes) =>
      dishes.filter((dish) => dish._id !== _id)
    );
  };

  return (
    <>
      <Head>
        <title>Zinger | Dishes</title>
      </Head>
      <div className="heightFixAdmin px-6 lg:py-20 sm:py-16 py-12">
        <div className="mx-auto max-w-screen-xl">
          <h2 className="lg:text-4xl sm:text-3xl text-2xl  font-bold mb-6 ">
            Dishes
          </h2>
          <div className="py-2">
            <input
              className="p-2 pl-6 h-full w-full outline-none cursor-pointer sm:text-base text-sm rounded-lg bg-gray-200"
              type="text"
              value={searchTerm}
              placeholder="Search a dish"
              onChange={searchDish}
            />
          </div>
          <div className="overflow-y-auto hideScrollBar h-96 p-1">
            {(searchTerm ? searchResult : dishes)?.map(
              ({ _id, title, price, description, category, image }, i) => (
                <DishInfo
                  _id={_id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  border={i + 1 !== dishes?.length}
                  key={`dish-${_id}`}
                  removeFromSearchResults={removeFromSearchResults}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Dishes.admin = true;
export default Dishes;

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();
  let dishes = await db.collection("dishes").find({}).toArray();
  dishes = JSON.parse(JSON.stringify(dishes));
  return {
    props: {
      dishes,
    },
    revalidate: 1,
  };
};
