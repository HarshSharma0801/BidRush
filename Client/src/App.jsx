import Home from "./Components/Pages/Home"
import { Route,Routes } from "react-router"
import Login from "./Components/Auth/SignIn"
import SignUp from "./Components/Auth/SignUp"
import axios from "axios"
import Account from "./Components/Pages/Account"
import AddItem from "./Components/AddItem/AddItem"
import SingleItem from "./Components/SingleItem/SingleItem"
import Cart from "./Components/Header/cart"
import {  useSelector } from "react-redux/es/hooks/useSelector"
import Auction from "./Components/Auction/Auction"
import YourItems from "./Components/YourItems/YourItems"
import Success from "./Components/Pages/success"
import YourOrders from "./Components/YourOrders/YourOrders"
function App() {

  axios.defaults.baseURL = "http://localhost:5000/"

  const isShown = useSelector(state=>state.CartUI.isShown)

  return (
    <>
    {isShown && <Cart/>}
   <Routes>
   <Route path="/" element={<Home/>} />
   <Route path="/signin" element={<Login/>} />
   <Route path="/signup" element={<SignUp/>} />
   <Route path="/account" element={<Account/>} />
   <Route path="/item/:id" element={<SingleItem/>} />

   <Route path="/account/additem" element={<AddItem/>} />
   <Route path="/account/yourItem" element={<YourItems/>}/>
   <Route path="/account/yourorders" element={<YourOrders/>}/>

   <Route path="/auction" element={<Auction/>} />
   <Route path="/success" element={<Success/>} />







   </Routes>
    </>
  )
}

export default App
