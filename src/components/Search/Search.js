import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Fade from "react-reveal/Fade";
import Image from "next/image";
import getDishes from "../../util/getDishes";
import { useRouter } from "next/router";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { dishes, isLoading, error } = getDishes();
    const [loading, setLoading] = useState(true);
    const searchRef = useRef(null);
    const router = useRouter();
    const options = {
        keys: ["title", "description", "category"],
    };

    const closeSearch = () => {
        setSearchTerm("");
        setSearchResults([]);
    };

    useEffect(() => {
        function handleClickOutside(e) {
            let targetEl = e.target;
            do {
                if (targetEl === searchRef.current) {
                    return;
                }
                targetEl = targetEl.parentNode;
            } while (targetEl);
            closeSearch();
        }
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const searchDish = async (e) => {
        setLoading(true);
        let term = e.target.value;
        setSearchTerm(term);
        term = term.toLowerCase();
        // Dynamically load fuse.js
        const Fuse = (await import("fuse.js")).default;
        const fuse = new Fuse(dishes ? dishes : [], options);
        setSearchResults(fuse.search(term));
        setLoading(false);
    };

    if (error) {
        console.error(error);
    }

    return (
        <div className="relative flex rounded-md  items-center" ref={searchRef}>
            <div className="absolute inset-y-0 left-2.5 flex items-center">
                <SearchIcon className="w-4 text-gray-600" />
            </div>
            <input
                className="p-2 pl-10 h-full flex-grow flex-shrink outline-none cursor-pointer sm:text-base text-sm rounded-lg bg-gray-200"
                type="text"
                value={searchTerm}
                placeholder="Search a dish"
                onChange={searchDish}
            />

            {searchTerm ? (
                <div className="absolute w-full h-auto sm:max-h-96 max-h-80 top-11 rounded-md bg-gray-100 overflow-y-auto shadow-md hideScrollBar">
                    {!isLoading || !loading ? (
                        searchResults?.length ? (
                            searchResults.map(({ item: { _id, title, image } }, i) => (
                                <Fade bottom key={`search-result-${i}${_id}`}>
                                    <div
                                        className={`flex cursor-pointer items-center justify-between lg:px-5 py-2  px-4  ${i !== searchResults.length
                                                ? "border-b  border-gray-200"
                                                : ""
                                            } bg-gray-50 hover:bg-gray-100`}
                                    >
                                        <h5 className="text-sm text-gray-700 pr-4 capitalize">
                                            {title}
                                        </h5>
                                        <div className="min-w-max">
                                            <Image
                                                src={image}
                                                height={40}
                                                width={40}
                                                alt=""
                                                objectFit="contain"
                                            />
                                        </div>
                                    </div>
                                </Fade>
                            ))
                        ) : (
                            <p className="text-xs text-gray-500 text-center py-4">
                                No dish found
                            </p>
                        )
                    ) : (
                        <p className="text-xs text-gray-500 text-center py-4">Loading...</p>
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Search;
