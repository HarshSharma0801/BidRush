import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { CartSliceActions } from "../Context/reducers/CartSlice";
import { useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";

const SingleItem = () => {
  const Itemid = useParams();
  const navigate = useNavigate()
  const [load, setload] = useState(true);
  const [Item, setItem] = useState();
  const [User,SetUser] = useState();
  const dispatch  = useDispatch();
  const [OrderDetails , setOrderDetails] = useState(
    {  
      name:'',
      price:'',
      image:'',
      quantity:''
  }
  )
  const getItem = async (id) => {
    axios.get(`/singleitem/${id}`).then((res) => {
 
      setItem(res.data.item);
      setOrderDetails({
        name:res.data.item.ItemName,
        price:res.data.item.price,
        image:res.data.item.Images[0],
        quantity:1
      })
      setload(false);
    });
  };

  useEffect(() => {
    getItem(Itemid.id);
  }, []);

  const getUser = async()=>{
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    if (data ) {
      const token = data.access;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const config = {
        headers: headers,
      };
      await axios.get('/Token' , config).then(res=>{
        if(!res.data.valid){
          navigate('/signin');
          SetUser(false);
        }
        else{
          SetUser(true)
          dispatch(CartSliceActions.AddtoCart({
            name:Item && Item.ItemName,
            price:Item && Item.price,
            id:Itemid.id,
            image:Item && Item.Images[0]
           }))
        }
      })
    }
   
  }

  const AddToCart = ()=>{
     getUser();
   
  }
  const [isValid, SetisValid] = useState(false);
 
  const BookClicked = async()=>{
    const data = JSON.parse(localStorage.getItem("UserInfo"));
if(data && OrderDetails){

  await axios.post("/Booking", OrderDetails).then((res) => {
    if (res.data.valid) {
      SetisValid(true);
    }
    let booking = res.data.OrderToken;
    localStorage.setItem("OrderToken" , booking)
  });
}
else{
  navigate('/singin')
}
  

    MakePayment();

  }


  const MakePayment = async()=>{
  
      const stripe = await loadStripe(
        "pk_test_51NnoXmSFHehR7P6bVlnz2V2A5VkVFjJYd8Veu7SZNvQYvT35zXs2f9e4dKHu6iyIJkm0uXc1rKjjjq0ksiWBEagA00hLiQAEzM"
      );
      const Paybody = {
        name: Item && Item.ItemName,
        amount: Item && Item.price,
        
      };

      try {
        await axios
          .post("/Payment", { Pay: Paybody, Book: OrderDetails })
          .then((res) => {
           
              const result = stripe.redirectToCheckout({
                sessionId: res.data.id,
              });
              if (result.error) {
                console.log(result.error);
              }
            
          });
      } catch (error) {
        console.error(error);
      }
    }
  



  return (
    <>
      {load && <Loader />}
      <Header />
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between pr-10">
          <div>
            <h1 className="md:text-4xl text-2xl font-smeibold">
              {Item && Item.ItemName}
            </h1>
          </div>

          <div>
            <p className="md:text-3xl text-xl">
              at only{" "}
              <span className="font-semibold">
                {" "}
                <span className="h-6">₹ </span> {Item && Item.price}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="font-normal text-2xl text-gray-600 dark:text-gray-400">
            in {Item && Item.category} category
          </p>
        </div>
        <div className="flex md:flex-row justify-center flex-col gap-8">
          {Item &&
            Item.Images.map((image) => {
              return (
                <div className="bg-gray-200 aspect-video md:w-[300px] md:h-[320px] w-[250px]  h-[308px] rounded-lg overflow-hidden">
                  <img src={image} alt="photo" className="p-2 w-full h-full" />
                </div>
              );
            })}
        </div>
        <div>
          <h1 className="text-lg md:text-2xl font-lg">Description</h1>
          <p className=" text-lg md:text-lg text-gray-600">
            {Item && Item.description}
          </p>
        </div>
        <div>
          <h1 className="text-lg md:text-2xl font-lg">Features</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-4">
            {Item &&
              Item.features.map((item) => {
                return (
                  <div className="pt-3 flex text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 px-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                      />
                    </svg>{" "}
                    {item}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="py-3">
            <button onClick={BookClicked} className="p-3 px-6 text-xl bg-lightdark text-black rounded-xl ">
                Buy Now
            </button>
          </div>
          <div className="py-3">
            <button onClick={AddToCart} className="p-3 px-6 text-xl text-black bg-light  rounded-xl">
                Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleItem;
