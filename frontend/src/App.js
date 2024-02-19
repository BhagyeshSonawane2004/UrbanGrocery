import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice";
import { useDispatch } from "react-redux";

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
        toast.error('Failed to fetch product data. Please try again later.');
      }
    };

    fetchData();
  }, [dispatch]);

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
