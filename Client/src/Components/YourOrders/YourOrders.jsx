import axios from 'axios'
import { useState , useEffect } from 'react'
import Header from "../Header/Header";



const YourOrders = ()=>{
    const [Orders, SetOrders] = useState([]);

    const getYourOrders = async () => {
        const data = JSON.parse(localStorage.getItem("UserInfo"));
        if (data) {
          const token = data.access;
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const config = {
            headers: headers,
          };
          await axios.get("/yourorder", config).then((res) => {
            if (res.data.valid) {
                SetOrders(res.data.orders);
            }
          });
        }
      };
    useEffect(()=>{
        getYourOrders();
    },[])

return(
    <>
    <Header/>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6 p-5">
        {Orders &&
          Orders.map((Item) => {
            return (
              <>
                <div className="flex flex-col gap-1 md:mt-2   bg-white border border-gray-300 rounded-lg  shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
                  <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
                    <img
                      src={Item.image}
                      alt="photo"
                      className="p-2 w-full h-full"
                    />
                  </div>
                  <div className=" flex flex-col px-3 gap-3 ">
                    <div className="flex justify-between">
                      <div className="text-center">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {Item.name}
                        </h5>
                      </div>
                    </div>

                    <p className="font-bold text-base text-gray-500 dark:text-gray-700">
                      for {Item.price}
                    </p>
                    <div className=" flex justify-center pb-2">
                      <p>
                        <h1
                         
                          className="text-xl text-black"
                        >
                          Ordered on {Item.Date}
                        </h1>
                      </p>
                      <p className='text-green-500'>
                        STATUS : PAID
                      </p>
                    </div>
                  </div>
                </div>

     
              </>
            );
          })}
      </div>

    </>
)


}


export default YourOrders