import Dish from "../Dish/Dish";
import { useState } from "react";
import { AdjustmentsIcon } from "@heroicons/react/outline";

function Menu({ dishes, categories }) {
  const [categoryActive, setCategoryActive] = useState("all");
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  const activeCategoryHandler = (category) => {
    if (category === "all" || categoryActive === category) {
      setCategoryActive("all");
      return;
    }
    setCategoryActive(category);
    filterDishes(category);
  };

  const filterDishes = (category) => {
    setFilteredDishes(
      dishes.filter((dish) => dish?.category === category)
    );
  };

  return (
    <div className="w-full py-20 px-6 bg-gray-100 mt-10" id="menu">
      <h2 className="heading lg:mb-32 sm:mb-28 mb-20  mt-4">Explore Our Best Menu</h2>
      <div className="flex items-center w-full max-w-screen-xl sm:mb-20 mb-16 gap-4  mx-auto overflow-x-auto hideScrollBar capitalize text-sm font-medium">
        <div>
          <AdjustmentsIcon className="w-6" />
        </div>
        <div
          className={` py-2 px-6 bg-white text-center rounded hover:bg-primary-light hover:text-white transition-all cursor-pointer ease-in-out duration-200 shadow ${categoryActive === "all" ? "bg-primary-light text-white" : ""
            }`}
          onClick={() => activeCategoryHandler("all")}
        >
          All
        </div>
        {categories?.map((category, i) => (
          <div
            key={`category-${i}`}
            className={`py-2 px-6 bg-white text-center whitespace-nowrap rounded hover:bg-primary-light hover:text-white transition-all cursor-pointer ease-in-out duration-200 shadow ${categoryActive === category?.name
                ? "bg-primary-light text-white"
                : ""
              }`}
            onClick={() => activeCategoryHandler(category?.name)}
          >
            {category?.name}
          </div>
        ))}
      </div>
      <div className="grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 mx-auto max-w-screen-xl gap-x-6 gap-y-8">
        {(categoryActive === "all" ? dishes : filteredDishes)?.map(
          ({ _id, title, price, description, category, image }) => (
            <Dish
              key={`dish-${_id}`}
              _id={_id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Menu;
