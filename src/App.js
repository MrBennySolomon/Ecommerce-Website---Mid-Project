import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home     from './pages/Home';
import About    from './pages/About';
import Root     from './pages/Root';
import Login    from './pages/Login';
import Cart     from './pages/Cart';
import Courses  from './pages/Courses';
import Products from './pages/Products';
import Course   from './pages/Course';
import Product  from './pages/Product';


const router = createBrowserRouter([
  {
    path: '/', 
    element: <Root/>,

  children: [
    {path: '/',             element: <Home/>},
    {path: '/about',        element: <About/>},
    {path: '/login',        element: <Login/>},
    {path: '/cart',         element: <Cart/>},
    {path: '/courses',      element: <Courses/>},
    {path: '/products',     element: <Products/>},
    {path: '/products/:id', element: <Product/>},
    {path: '/courses/:id',  element: <Course/>},
  ]
  }
]);

const App = () => {
  return (
        <RouterProvider router={router} />
  )
}
export default App;
