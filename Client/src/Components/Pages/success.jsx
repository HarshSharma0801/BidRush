import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Success = ()=>{
    const [OrderData , SetOrderData] = useState();


    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("UserInfo"));

      const token  = localStorage.getItem("OrderToken");
      const Roken  = data.access;
  
      const headers = {
        'Authorization': `Bearer ${Roken}`,
          'main': token,
  
        };
        const config = {
          headers: headers
        };
        
          axios.get('/BookingData' , config).then((res)=>{
            SetOrderData(res.data.data)
         
          });
      
      },[]);
  
  
  
  
    return (
      <>
        <div className="flex bg-black text-white text-3xl  justify-between w-screen p-4 sm:px-5">
          <div>
            BidRush
          </div>
         
        </div>
        <div className="flex justify-center m md:m-[200px] text-center">
          <div>      
                <h1 className="md:text-3xl text-xl">Your Payment was a  </h1>
                <h1 className="md:text-3xl text-2xl py-2 text-green-500">{OrderData && OrderData} !</h1>
                         
                         <Link  to={'/'}>
                          <button className="mt-2  p-3 border-black border hover:bg-black hover:text-white rounded-full">
                               Return Home
                          </button>
                         </Link>
           
  
          </div>
        </div>
      </>
    );



} 


export default Success