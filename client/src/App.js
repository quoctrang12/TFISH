import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as Component from "./Component";
import axios from "axios";
import { useStore, actions } from "./Store";

function App() {
  const [showHeader, setShowHeader] = useState(false);
  const [state, dispatch] = useStore();
  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY >= 190);
    };
    window.addEventListener("scroll", handleScroll);
    console.log("render")
  },[]);
  
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
  }, []);

  return (
    <>
      <Component.Header showHeader={showHeader} />
      <Routes>
        <Route path="/" element={<Component.PageHome />}></Route>
        <Route path="/search/:searchTitle" element={<Component.PageSearch />}></Route>
        <Route path="/login" element={<Component.PageLogin />}></Route>
        <Route path="/logon" element={<Component.PageLogon />}></Route>
        <Route path="/user" element={<Component.PageUser />}></Route>
        <Route path="/product" element={<Component.PageProduct />}></Route>
        <Route
          path="/details/:productID"
          element={<Component.PageDetailsProduct />}
        ></Route>
        <Route path="/contact" element={<Component.PageContact />}></Route>
        <Route path="/cart" element={<Component.PageCart />}></Route>
        <Route path="/Admin" element={<Component.PageAdmin />}></Route>
      </Routes>

      <Component.Footer />
    </>
  );
}

export default App;
