import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import { useStore, actions } from "./Store";
import * as Component from "./Component";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ClientRoutes from "./Routes/ClientRoutes";

function App() {
  const [state, dispatch] = useStore();
  useEffect(() => {
    axios
      .get("/api/product")
      .then((result) => {
        dispatch(actions.setAllProducts(result.data.product));
        for (
          let i = (state.numberPageProduct - 1) * 9;
          i < state.numberPageProduct * 9;
          i++
        ) {
          dispatch(actions.setOnePageProduct(result.data.product[i]));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.update, state.numberPageProduct, dispatch]);

  return (
    <>
      <Routes>
        <Route element={<ClientRoutes />}>
          <Route path="/" element={<Component.PageHome />}></Route>
          <Route path="/search" element={<Component.PageSearch />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/contact" element={<Component.PageContact />}></Route>
            <Route path="/cart" element={<Component.PageCart />}></Route>
            <Route path="/bill" element={<Component.PageBill />}></Route>
          </Route>
          <Route path="/login" element={<Component.PageLogin />}></Route>
          <Route path="/logon" element={<Component.PageLogon />}></Route>
          <Route path="/product" element={<Component.PageProduct />}></Route>
          <Route
            path="/details/:productID"
            element={<Component.PageDetailsProduct />}
          ></Route>
        </Route>
        <Route path="/admin" element={<Component.PageAdmin />}>
          <Route index element={<Component.PageAdminDashboard />} />
          <Route path="product" element={<Component.PageAdminProduct />} />
          <Route path="user" element={<Component.PageAdminUser />} />
          <Route path="bill" element={<Component.PageAdminBill />} />
        </Route>
      </Routes>
      <ToastContainer pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default App;
