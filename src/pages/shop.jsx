import { useState, useEffect } from "react";
// import { ProductsCard } from "../components/productCard";
import LoadingSpinner from "../components/spinner";
import db from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { TopCard } from "../components/topcard";

export function Shop() {
const [loading, setloading] = useState(false);
const [empty, setempty] = useState(false);
const [error, seterror] = useState("");
const [hairs, sethairs] = useState([]);
const [search, setsearch] = useState("");
const navigate = useNavigate();
const {product} = useParams()

console.log(error)

  useEffect(() => {
    try {
      setloading(true);
      setempty(false);
      db.collection("Products")
      .where("category", "==", product)
        // .limit(10)
        .get()
        .then((collections) => {
          const cloths = collections.docs.map((cloths) => {
            return { ...cloths.data(), id: cloths.id };
          });
          sethairs(cloths);
          setTimeout(() => {
            setloading(false);
          }, 1000);
          if (cloths.length === 0) {
            setempty(true);
          }
        });
    } catch (err) {
      seterror(err);
      console.log(err);
    }
  }, []);

return ( <div>
      <div className="pt-[4rem] bg-[#341b1d]"></div>
        <p className="text-2xl mt-[1rem]">Shop</p>
        <form className="relative"   onSubmit={() => {
          navigate(`/Search/${search}`);
        }}>
        <input
          type="text"
          placeholder="Search for products, categories..."
          className="border border-[#b76e79] w-[90%] px-[1rem] py-[0.3rem] rounded-[20px] my-[0.5rem] bg-white"
          onChange={(e) => {
            setsearch(e.target.value);
          }}
      />
        <svg
          width="35px"
          className="border border-[#b76e79] p-[0.3rem] rounded-[20px] absolute top-[16%] right-[5%] bg-[#b76e79]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M15 15L21 21"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#ffffff"
              stroke-width="2"
            ></path>{" "}
          </g>
        </svg>
      </form>
      <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
                    {loading && (
                  <LoadingSpinner/>
                    )}
                  </p>
                  <p className="w-[100%] text-center">
                    {empty && "Please Check Your Network Connection"}
                  </p>



      {hairs.map((post, index) => {
            return (
              <div
              key={index}
              onClick={() => {
                // navigate(`/Buy/Products/${post.category}/${post.id}`)
              }}
              className="sm:w-[85vw] lg:w-[90%]"
            >
                <TopCard post={post} />
              </div>
            );
          })}
          <p className="my-[2rem]">Footer</p>
    </div> );
}

