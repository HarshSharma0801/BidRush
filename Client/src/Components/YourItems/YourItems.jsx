import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";

const YourItems = () => {
  const [Items, SetItems] = useState([]);
  const navigate = useNavigate();
  const [Remove, SetRemove] = useState(false);
  const [load, setload] = useState(false);
  const getYourItem = async () => {
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    if (data) {
      const token = data.access;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const config = {
        headers: headers,
      };
      await axios.get("/youritem", config).then((res) => {
        if (res.data.valid) {
          SetItems(res.data.items);
        }
      });
    }
  };

  useEffect(() => {
    getYourItem();
  }, []);


  const RemoveItem = async(data)=>{
    SetRemove(false);
     setload(true);

    await axios.post('/deleteitem' , data).then(res=>{
        if(res.data.valid){
            navigate('/')
        }
    })

  }

  return (
    <>
      {load && <Loader />}
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6 p-5">
        {Items &&
          Items.map((Item) => {
            return (
              <>
                <div className="flex flex-col gap-1 md:mt-2   bg-white border border-gray-300 rounded-lg  shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
                  <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
                    <img
                      src={Item.Images[0]}
                      alt="photo"
                      className="p-2 w-full h-full"
                    />
                  </div>
                  <div className=" flex flex-col px-3 gap-3 ">
                    <div className="flex justify-between">
                      <div className="text-center">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {Item.ItemName}
                        </h5>
                      </div>
                    </div>

                    <p className="font-bold text-base text-gray-500 dark:text-gray-700">
                      in {Item.category}
                    </p>
                    <div className=" flex justify-center pb-2">
                      <p>
                        <button
                          onClick={() => {
                            SetRemove(true);
                          }}
                          className="text-base cursor-pointer text-white bg-red-600 rounded-xl border  p-1 hover:bg-red-700 hover:text-white"
                        >
                          Remove
                        </button>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    Remove ? "fixed" : "hidden"
                  } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
                >
                  <div
                    className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
                  >
                    <div className="ml-[200px] md:ml-[400px] cursor-pointer">
                      <svg
                        onClick={() => {
                          SetRemove(false);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div className="pb-[10px]">
                      <h1 className="m-0 font-bold md:text-2xl">
                        you really want to Remove ?
                      </h1>
                    </div>
                    <div>
                      <button onClick={()=>{
                        RemoveItem({id:Item._id});
                      }} className="inline-flex items-center px-6 py-3 text-xl font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default YourItems;
