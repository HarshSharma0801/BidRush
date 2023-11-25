import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { CartUIActions } from "../Context/reducers/CartUI";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loader from "../Loader/Loader";
import { CartSliceActions } from "../Context/reducers/CartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isData, setisData] = useState();
  const [load, setload] = useState(true);
  const [User, SetUser] = useState();
  const TotalItems = useSelector((state) => state.CartSlice.totalItems);
  const CartClicked = () => {
    dispatch(CartUIActions.CartUIShow());
  };

  const IsUser = () => {
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    if (data) {
      const token = data.access;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const config = {
        headers: headers,
      };

      axios.get("/Token", config).then((res) => {
        if (res.data.valid) {
         navigate('/auction')
        } else {
          navigate('/signin')
        }
      });
    } else {
      navigate('/signin')
    }
  };

  useEffect(() => {
    const getUser = () => {
      const data = JSON.parse(localStorage.getItem("UserInfo"));
      if (data) {
        const token = data.access;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const config = {
          headers: headers,
        };

        axios.get("/Token", config).then((res) => {
          if (res.data.valid) {
            SetUser(res.data.Userdata);
            setisData(true);
          } else {
            setisData(false);
          }
        });
      } else {
        setisData(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getCart = () => {
      setTimeout(() => {
        setload(false);
      }, 1200);
      const data = JSON.parse(localStorage.getItem("UserInfo"));
      if (data) {
        const token = data.access;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const config = {
          headers: headers,
        };
        axios.get("/getcart", config).then((res) => {
          if (res.data.valid) {
            const data = res.data.cart;
            dispatch(
              CartSliceActions.setInitialData({
                items: data.Items,
                totalItems: data.TotalItems,
                totalPrice: data.TotalPrice,
              })
            );
          }
        });
      }
    };
    getCart();
  }, []);

  return (
    <>
      {load && <Loader />}
      <div className="flex justify-between md:justify-around items-center  w-[100%] text-white bg-black p-4 ">
        <div>
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="text-3xl  cursor-pointer"
          >
            BidRush
          </h1>
        </div>
        <div className="flex justify-center md:hidden">
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="hidden md:flex  justify-center rounded-2xl bg-white ">
          <input
            type="text"
            className="text-black text-xl rounded-2xl w-[35vw] outline-none  font-semibold p-3"
            placeholder="search"
          />
          <div className="text-center flex justify-center items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className=" hidden md:flex gap-8 p-2 items-center text-center justify-center">
          <div className="text-lg flex-[0.15]">
            <button
              onClick={IsUser}
              className="p-2 border border-white rounded-xl text-white hover:text-black hover:bg-white"
            >
              Auction
            </button>{" "}
          </div>
          <div className=" flex-[0.15">
            <button
              onClick={CartClicked}
              className="border flex p-3 rounded-full hover:bg-white hover:text-black border-white"
            >
              <span>
                {" "}
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </span>
              <span className="rounded-[30px] text-black bg-white  px-[1rem]">
                {TotalItems}
              </span>
            </button>
          </div>

          <div>
            {isData ? (
              <button
                onClick={() => {
                  navigate("/account");
                }}
                className="flex px-[19px] py-1 text-[17px] border border-white rounded-xl bg-black hover:text-black hover:bg-white"
              >
                Hi, {User && User.name}
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/signin");
                }}
                className="p-3 px-6 rounded-full  border border-white bg-black hover:text-black hover:bg-white"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
