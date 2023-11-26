import Header from "../Header/Header";
import { useNavigate } from "react-router";



const Signout = ()=>{
const navigate = useNavigate();

   const data = JSON.parse(localStorage.getItem("UserInfo"));
   
   const info = data.info;

const click = ()=>{

    localStorage.removeItem("UserInfo");
    navigate('/')
}


return(
    <>
    <Header/>
    <div className="flex flex-col md:py-24 items-center gap-5 justify-center md:text-4xl">
    
     <div className="py-3">
        <p className="py-4">  <span className="text-gray-500">Hi,</span> {info.name}</p> 
        <p>
       <span className="text-gray-500">you are currently signed in as</span>  {info.email}

        </p>
     </div>
     <div>
        <button onClick={click} className="p-4 px-6 text-2xl rounded-full border border-black hover:text-white hover:bg-black">
            Sign Out
        </button>
     </div>
    </div>
    </>

)


}

export default Signout