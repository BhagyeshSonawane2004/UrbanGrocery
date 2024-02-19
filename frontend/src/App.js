import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Removed unnecessary import of toast
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice";
import { useDispatch } from "react-redux"; // Removed unnecessary import of useSelector
// Removed unnecessary import of useSelector as we are not using it directly in this file

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
        if (!res.ok) {
          throw new Error('Failed to fetch product data');
        }
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error('Error fetching product data:', error.message);
        // You can handle errors here, e.g., show a toast notification
      }
    };

    fetchData();
  }, [dispatch]); // Added dispatch as a dependency for useEffect

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
