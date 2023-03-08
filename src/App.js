import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home       from './MVC/View/Home';
import About      from './MVC/View/About';
import Root       from './MVC/View/Root';
import Login      from './MVC/View/Login';
import Cart       from './MVC/View/Cart';
import Courses    from './MVC/View/Courses';
import Products   from './MVC/View/Products';
import Course     from './MVC/View/Course';
import Product    from './MVC/View/Product';
import ErrorPage  from './MVC/View/Error';
import Live       from './MVC/View/Live';
import Coupons    from './MVC/View/Coupons';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Root/>,
    errorElement: <ErrorPage/>,
  children: [
    {path: '/',             element: <Home/>},
    {path: '/about',        element: <About/>},
    {path: '/login',        element: <Login/>},
    {path: '/cart',         element: <Cart/>},
    {path: '/courses',      element: <Courses/>},
    {path: '/products',     element: <Products/>},
    {path: '/live',         element: <Live/>},
    {path: '/coupons',      element: <Coupons/>},
    {path: '/products/:id', element: <Product/>},
    {path: '/courses/:id',  element: <Course/>}
  ]
  }
]);

const App = () => { 

  return (
        <RouterProvider router={router} />
  )
}
export default App;
