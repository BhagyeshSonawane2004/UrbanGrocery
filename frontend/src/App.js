// App.js

import React, { useEffect } from "react"; // Import React and useEffect
import "./App.css";
import Header from "./components/Header"; // Corrected import path
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlice";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`); // Corrected environment variable name
        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error("Error fetching product data:", error.message);
        toast.error("Failed to fetch product data"); // Notify user of the error
      }
    };

    fetchProductData(); // Call the fetch function
  }, [dispatch]); // Include dispatch in the dependency array

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
