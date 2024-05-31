import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import ProductDetail from './pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: '/about', element: <About /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="" element={<Home />}></Route>
//     <Route path="/products" element={<Products />}></Route>
//   </Route>
// );

//const route2 = createBrowserRouter(routeDefinitions);
function App() {
  //return <RouterProvider router={route2} />;
  return <RouterProvider router={router} />;
}

export default App;
