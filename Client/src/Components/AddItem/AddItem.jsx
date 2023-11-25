import Header from "../Header/Header"
import { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";

const AddItem =()=>{
    const [FileInput, SetFileInput] = useState([]);
    const [SelectedFile, SetSelectedFile] = useState("");
    const [load,setload] = useState(false);
    const [isDataReady, SetDataReady] = useState(false);

    const [formData, setFormData] = useState({
        ItemName: "",
        Images: [],
        description: "",
        category: "",
        price: "",
        features: [],
      });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "features") {
          const items = value.split(",").map((item) => item.trim());
          setFormData({ ...formData, [name]: items });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
      const HandlePhotoChange = (e) => {
        const file = e.target.files[0];
        formData.Images.push(file);
        UrlPhotos(file);
      };
      
  const UrlPhotos = (files) => {
    const reader = new FileReader();

    reader.readAsDataURL(files);
    reader.onloadend = () => {
      SetSelectedFile(reader.result);
    };
  };

  if (SelectedFile != "") {
    SelectedFile && FileInput.push(SelectedFile);
    SetSelectedFile("");
  }

  const AddItemApi = async(Data)=>{
    const data = JSON.parse(localStorage.getItem("UserInfo"));
    if (data) {
      const token = data.access;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const config = {
        headers: headers,
      };
    
  
      await axios.post('/additem' , Data , config).then(res=>{
        if(res.data.valid){
                  navigate('/');

        }
      })

    }  
  }

  const GetPhotosLink = (arr) => {
    const urls = arr.map(item=>item.url);
    if (arr) {
      setFormData({ ...formData, Images: urls });
      SetDataReady(true);
    }
  };

  if(isDataReady){
    AddItemApi(formData);
  }

  const FormPhotos = async(data)=>{
    
    await axios.post('/cloudinary' , data).then(res=>{
      if(res.data){
         GetPhotosLink(res.data);
      }

   });

  }



  const AddItemSubmit = (e)=>{
         e.preventDefault();
         setload(true);
         FormPhotos(FileInput);

  }


    return(
         <>
         <Header/>
         {load && <Loader/>}
         <div className="flex justify-center items-center p-5">
            <div className="text-3xl font-semibold">
                <h1>List Your Item</h1>
            </div>
         </div>
         <div>
         <form onSubmit={AddItemSubmit} className="h-[100%] ml-3 md:ml-0 mt-10 mb-10" >
      <div className="flex flex-col md:gap-8 gap-3 md:m-5">
        <div className="flex flex-col justify-center">
          <label
            className="flex  gap-[0.5rem] md:gap-1  text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
            htmlFor="ItemName"
          >
            Name{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-5 md:w-7 md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="ItemName"
            id="ItemName"
            placeholder="Main Title"
            className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
          />
        </div>
        <div>
          <label
            className="flex gap-[0.5rem]  md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
            htmlFor="category"
          >
            Category
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-5 md:w-7 md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
          />
        </div>

       

        
        <div>
          <label className="flex gap-[0.5rem] md:gap-1  text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 ">
            Photos{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-5 md:w-7 md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </label>

          <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
            {FileInput &&
              FileInput.map((url) => {
                return (
                  <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
                    <img src={url} alt="photo" className="w-full h-full " />
                  </div>
                );
              })}

            <label className=" border border-gray-400 md:p-8 cursor-pointer mt-3 p-4 md:text-2xl text-gray-600 md:rounded-lg text-center flex justify-center px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-5 md:w-7 md:h-8 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>{" "}
              Upload{" "}
              <input
                type="file"
                onChange={HandlePhotoChange}
                name="photos"
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div>
          <label
            className="flex gap-[0.5rem] md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
            htmlFor="description"
          >
            Description
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-5 md:w-7 md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </label>
          <textarea
            onChange={handleChange}
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            className="w-[100%] outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
          />
        </div>

        <div>
          <label
            className="flex gap-[0.5rem] md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
            htmlFor="price"
          >
            Price (in Rupee){" "}
          {" "}
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="price"
            id="price"
            placeholder="Price"
            className="w-1/4 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
          />
        </div>

        <div>
          <label
            className="flex gap-[0.5rem] md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
            htmlFor="features"
          >
            Features (in commas){" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-5 md:w-7 md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="features"
            id="features"
            placeholder="Features"
            className="w-3/4 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
          />
        </div>
      </div>
      <div className="">
      <button
        type="submit"
        className="mt-3 md:w-1/4 my-[30px]  mx-auto flex justify-center md:text-xl border border-transparent p-2 md:py-4 text-sm font-medium rounded-md text-white bg-black hover:bg-clack focus:outline-none focus:ring-2 "
      >
        List Your Item
      </button>
      </div>
  
    </form>
         </div>
         
         

        

         </>
    )


}

export default AddItem