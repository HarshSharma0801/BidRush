import { useDispatch } from "react-redux";
import { CartUIActions } from "../Context/reducers/CartUI";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CartSliceActions } from "../Context/reducers/CartSlice";
import axios from "axios";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const Items = useSelector((state) => state.CartSlice.items);
  const TotalPrice = useSelector((state) => state.CartSlice.totalPrice);
  const TotalItems = useSelector((state) => state.CartSlice.totalItems);


  const RemoveCartUI = () => {
    dispatch(CartUIActions.CartUIShow());
  };

  const AddItem = (data) => {
    dispatch(CartSliceActions.AddtoCart(data));
  };

  const RemoveItem = (data) => {
    dispatch(CartSliceActions.removeFromCart(data));
  };

  
   
  const SaveChanges = async(Data)=>{
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    if (data) {
      const token = data.access;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const config = {
        headers: headers,
      }
      await axios.post('/savecart' , Data , config).then(res=>{
        
        if(res.data.valid){
            dispatch(CartUIActions.CartUIShow());
        }
    })
    };


  }



  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
      >
        <div
          className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
        >
          <div
            onClick={RemoveCartUI}
            className="ml-[200px] md:ml-[400px] cursor-pointer"
          >
            <svg
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

          <div className="flex flex-col gap-2 p-2">
            {Items.length == 0 && <h1>No Items </h1>}
            {Items.map((Item) => {
              return (
                <div className="flex justify-between border-b-2">
                  <div className="flex gap-2">
                    <div className="bg-gray-200 aspect-video md:w-[150px] md:h-[150px] w-[250px]  h-[308px] rounded-lg overflow-hidden">
                      <img
                        src={Item.image}
                        alt="photo"
                        className="p-2 w-full h-full"
                      />
                    </div>
                    <div className=" py-6">
                      <h1 className="text-center">{Item.name}</h1>
                      <p className="text-start py-7 ">X {Item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 py-6">
                    <div>
                      <span className="h-6">₹ </span>{" "}
                      {Item.price * Item.quantity}
                    </div>
                    <div className="flex gap-2 py-5">
                      <button
                        onClick={() => {
                          AddItem({
                            price: Item.price,
                            id: Item.id,
                          });
                        }}
                        className="text-2xl px-4 py-2 border border-black hover:bg-black hover:text-white"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          RemoveItem(Item.id);
                        }}
                        className="text-2xl border-black px-4 py-2 border hover:bg-black hover:text-white"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {Items.length > 0 && (
            <>
              <div className="flex justify-center">
                <h1 className="text-xl">
                  Your Total is <span className="h-6">₹ </span> {TotalPrice}
                </h1>
              </div>
              <div className="flex py-2 justify-center gap-2">
                <div >
                  <button className="p-3  text-lg bg-lightdark text-black rounded-xl ">
                    Buy Now
                  </button>
                </div>
                <div >
                  <button onClick={()=>{
                    SaveChanges({
                        items:Items,
                        totalItems:TotalItems,
                        totalPrice:TotalPrice
                    })
                  }} className="p-3  text-lg text-black bg-light  rounded-xl">
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
