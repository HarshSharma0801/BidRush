// import { useEffect, useState } from "react";
// import Header from "../Header/Header";
// import { io } from 'socket.io-client';
// import axios from "axios";


// const Auction = () => {
//   const [ConfirmBid, SetConfirmBid] = useState(false);
//   const [MakeBid, SetMakeBid] = useState(false);

//   const [click , setclick] = useState(false);

//   const socket = io("http://localhost:5000/");
  
//   const [Items , setItems] = useState([])

 

//    useEffect(()=>{

//     socket.on('initialData' , (data)=>{
//        setItems(data);
//     } )
//    },[socket])


//   const confirmed = (data , id)=>{
//     socket.emit('customEvent', { currentBid: data , id:id});
//     SetMakeBid(false);
//     setclick(false);

//   }




  

 
//    useEffect(()=>{

//     socket.on('changed' , (data)=>{
//        setItems(data);
//     } )
//    },[click])



//   return (
//     <>
//       <Header />

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6 p-5">
//        {Items.length>0 && Items.map(Item=>{

//         return <>
        
//         <div className="flex flex-col gap-1 md:mt-2   bg-white border border-gray-300 rounded-lg  shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
//           <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
//             <img
//               src={Item.Image}
//               alt="photo"
//               className="p-2 w-full h-full"
//             />
//           </div>
//           <div className=" flex flex-col px-3 gap-3 ">
//             <div className="flex justify-between">
//               <div className="text-center">
//                 <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
//                   {Item.Itemname}
//                 </h5>
//               </div>
//               <div className="text-center py-1">
//                 <p className="font-normal text-base text-gray-600 dark:text-gray-400">
//                   Start Bid <span className="h-6">₹ </span>{Item.startBid}
//                 </p>
//               </div>
//             </div>

//             <p className="font-bold text-base text-green-500 dark:text-green-700">
//               Current Bid at <span className="h-6">₹ </span>{Item.currentBid}
//             </p>
//             <div className=" flex justify-between pb-2">
//               <p className=" font-normal text-base text-black dark:text-gray-400">
//                 <span className="">
//                   <div className="flex py-2 gap-1 justify-center text-center font-semibold text-base text-black dark:text-black items-center">
//                     Next Bid at <span className="h-6">₹ </span>{Number(Item.currentBid)+10000}
//                   </div>
//                 </span>{" "}
//               </p>
//               <p>
//                 <button
//                   onClick={() => {
//                     SetConfirmBid(true);
//                   }}
//                   className="text-base cursor-pointer text-black rounded-xl border border-black p-1 hover:bg-black hover:text-white"
//                 >
//                   Make Bid
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//         <div
//         className={`${
//           ConfirmBid ? "fixed" : "hidden"
//         } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
//       >
//         <div
//           className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
//         >
//           <div className="ml-[200px] md:ml-[400px] cursor-pointer">
//             <svg
//               onClick={() => {
//                 SetConfirmBid(false);
//               }}
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </div>
//           <div className="pb-[10px]">
//             <h1 className="m-0 font-bold md:text-2xl">
//               you really want to Make Bid ?
//             </h1>
//           </div>
//           <div>
//             <button
//               onClick={() => {
//                 SetConfirmBid(false);
//                 SetMakeBid(true);
//               }}
//               className="inline-flex items-center px-6 py-3 text-xl font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//             >
//               Yes
//             </button>
//           </div>
//         </div>
//       </div>

//       <div
//         className={`${
//           MakeBid ? "fixed" : "hidden"
//         } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
//       >
//         <div
//           className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
//         >
//           <div className="ml-[200px] md:ml-[400px] cursor-pointer">
//             <svg
//               onClick={() => {
//                 SetMakeBid(false);
//               }}
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </div>
//           <div className="pb-[10px]">
//             <h1 className="m-0 font-bold md:text-2xl">Make Bid</h1>
//           </div>
//           <div className="flex p-3 flex-col gap-4 justify-center">
//             <div className="text-2xl">
//              <h1>You are Bidding <span className="h-6">₹ </span>{Number(Item.currentBid)+10000} for this product</h1>
//             </div>
//             <div>
//             <button
//              onClick={()=>{
//               confirmed(Number(Item.currentBid)+10000 , Item._id)
//              }}
//               className="inline-flex items-center px-6 py-3 text-xl font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//             >
//               Confirm
//             </button>
//             </div>
//           </div>
//         </div>
//       </div>
//         </>

//        })}



//       </div>
     
//     </>
//   );
// };

// export default Auction;



import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { io } from 'socket.io-client';

const Auction = () => {
  const [ConfirmBid, SetConfirmBid] = useState(false);
  const [MakeBid, SetMakeBid] = useState(false);

  const socket = io("http://localhost:5000/");
  
  
  const [auctionData , SetauctionData] = useState({

       startBid:40000,
       currentBid:50000,

  })
  useEffect(()=>{

    socket.on('changedBid' , (data)=>{
        SetauctionData({
          ...auctionData , currentBid:data.Bid
        })
    } )
   },[socket])


  const confirmed = ()=>{
    const data = Number(auctionData.currentBid)+10000
    socket.emit('customEvent', { Bid: data  });

    SetMakeBid(false);
  
  }

  

 

  

  return (
    <>
      <Header />
      <div className="p-6 text-center"> 
      <h1 className="text-xl">Bids are Updating and Visible to users in real time </h1>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6 p-5">
        <div className="flex flex-col gap-1 md:mt-2   bg-white border border-gray-300 rounded-lg  shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
          <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
            <img
              src="https://shreeamritsarsword.com/wp-content/uploads/2021/09/Sikh-Wedding-Sword.jpg"
              alt="photo"
              className="p-2 w-full h-full"
            />
          </div>
          <div className=" flex flex-col px-3 gap-3 ">
            <div className="flex justify-between">
              <div className="text-center">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Ancient Sword
                </h5>
              </div>
              <div className="text-center py-1">
                <p className="font-normal text-base text-gray-600 dark:text-gray-400">
                  Start Bid <span className="h-6">₹ </span>{auctionData.startBid}
                </p>
              </div>
            </div>

            <p className="font-bold text-base text-green-500 dark:text-green-700">
              Current Bid at <span className="h-6">₹ </span>{auctionData.currentBid}
            </p>
            <div className=" flex justify-between pb-2">
              <p className=" font-normal text-base text-black dark:text-gray-400">
                <span className="">
                  <div className="flex py-2 gap-1 justify-center text-center font-semibold text-base text-black dark:text-black items-center">
                    Next Bid at <span className="h-6">₹ </span>{Number(auctionData.currentBid)+10000}
                  </div>
                </span>{" "}
              </p>
              <p>
                <button
                  onClick={() => {
                    SetConfirmBid(true);
                  }}
                  className="text-base cursor-pointer text-black rounded-xl border border-black p-1 hover:bg-black hover:text-white"
                >
                  Make Bid
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          ConfirmBid ? "fixed" : "hidden"
        } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
      >
        <div
          className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
        >
          <div className="ml-[200px] md:ml-[400px] cursor-pointer">
            <svg
              onClick={() => {
                SetConfirmBid(false);
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
              you really want to Make Bid ?
            </h1>
          </div>
          <div>
            <button
              onClick={() => {
                SetConfirmBid(false);
                SetMakeBid(true);
              }}
              className="inline-flex items-center px-6 py-3 text-xl font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          MakeBid ? "fixed" : "hidden"
        } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
      >
        <div
          className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
        >
          <div className="ml-[200px] md:ml-[400px] cursor-pointer">
            <svg
              onClick={() => {
                SetMakeBid(false);
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
            <h1 className="m-0 font-bold md:text-2xl">Make Bid</h1>
          </div>
          <div className="flex p-3 flex-col gap-4 justify-center">
            <div className="text-2xl">
             <h1>You are Bidding <span className="h-6">₹ </span>{Number(auctionData.currentBid)+10000} for this product</h1>
            </div>
            <div>
            <button
             onClick={confirmed}
              className="inline-flex items-center px-6 py-3 text-xl font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Confirm
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
