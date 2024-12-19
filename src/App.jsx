import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOut from "./components/Layout/layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/Signup/Signup.jsx";
import ProtectRoutes from "./components/ProtectRoutes/ProtectRoutes.jsx";
import TokenProvider from "./Context/token.context.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import CartContext from "./Context/cart.context.jsx";
import ProductProvider from "./Context/ProductSp.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishListProvider from "./Context/WishList.context.jsx";
import SpeceficCategory from "./Context/SpeceficCategory.jsx";
import CheckOut from "./pages/CheckOut/CheckOut.jsx";
import Cart from "./pages/cart/cart.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Profile from "./pages/Profile/Profle.jsx";

export default function App() {
  // take a object client from queryClient that import from tanstak for (stae mangment)
  let client = new QueryClient();
  const routes = createBrowserRouter(
    [
      {
        path: "",
        element: (
          // protect the layout and if user have token appear it children  (written in protectRoutes component)
          <ProtectRoutes>
            <LayOut />
          </ProtectRoutes>
        ),
        children: [
          { index: true, element: <Home /> },
          { path: "/cart", element: <Cart /> },
          { path: "/categories/:id", element: <Categories /> },
          { path: "/product/:id", element: <ProductDetails /> },
          { path: "/favorites", element: <Favorites /> },
          { path: "/checkout", element: <CheckOut/> },
          { path: "/allorders", element: <Orders/> },
          { path: "/profile", element: <Profile /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      {
        // if the user don't have token appear this layout 
        path: "/auth",
        element: <LayOut />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
    ],
    {
    }
  );

  return (
    <TokenProvider>
      <QueryClientProvider client={client}>
        <ProductProvider >
          <WishListProvider>
          <SpeceficCategory>
            <CartContext>
              <RouterProvider router={routes} />
            </CartContext>
            </SpeceficCategory>
          </WishListProvider>
        </ProductProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </TokenProvider>
  );
}
