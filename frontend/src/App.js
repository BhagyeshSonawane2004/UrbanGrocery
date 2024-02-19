import { useDispatch, useSelector } from 'react-redux'; 
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
 
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
        console.error('Error fetching product data:', error);
        // Display an error toast message
        toast.error('Error fetching product data');
      }
    };

    fetchData();
  }, [dispatch]);
  

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
