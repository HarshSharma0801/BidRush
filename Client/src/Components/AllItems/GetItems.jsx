import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetItems = () => {
  const [Items, SetItems] = useState([]);

  const getItems = async () => {
    await axios.get("/items").then((res) => {
      SetItems(res.data.items);
    });
  };

  useEffect(() => {
    getItems();
  }, []);


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6 p-5">
        {Items.length > 0 &&
          Items.map((Item) => {
            return (
              <div className=" md:mt-2 md:w-[300px] md:h-[320px] w-[250px]  h-[308px]  bg-white border border-gray-300 rounded-lg  shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
                <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
                  <img
                    src={Item.Images[0]}
                    alt="photo"
                    className="p-2 w-full h-full"
                  />
                </div>
                <div className="p-3">
                  <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {Item.ItemName}
                    </h5>
                  </a>

                  <p className="font-normal text-base text-gray-600 dark:text-gray-400">
                    {Item.category} at
                  </p>
                  <div className="mt-2 flex justify-between">
                    <p className=" font-normal text-base text-black dark:text-gray-400">
                      <span className="font-bold   text-xl">
                        <div className="flex gap-1 justify-center text-center items-center">
                       
                       <span className="h-6">₹ </span> {Item.price}
                        </div>
                   
                      </span>{" "}
                    </p>
                    <p>
                      <Link
                        to={`/item/${Item._id}`}
                        className="text-base text-black hover:underline"
                      >
                        view details
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default GetItems;
