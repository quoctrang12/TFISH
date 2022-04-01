import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom"
import * as Component from "./Component"


function App() {
  const [showHeader,setShowHeader ]= useState(false);
  const [showName, setShowName ]= useState("")
  useEffect(() => {
      const handleScroll = () => {
        setShowHeader(window.scrollY>=190);
        
      }
    window.addEventListener("scroll",handleScroll);
    
  },[])

    const callBack = (childData) => {
      setShowName(childData)
    }
  return (
    <>
    <Component.Header showHeader={showHeader} showName={showName} parent = {callBack}/>
    <Routes>
      <Route path="/" element = {<Component.PageHome/>}></Route>
      <Route path="/news" element = {<Component.PageNews/>}></Route>
      <Route path="/login" element = {<Component.PageLogin parent = {callBack}/>}></Route>
      <Route path="/logon" element = {<Component.PageLogon/>}></Route>
      <Route path="/user" element = {<Component.PageUser/>}></Route>
      <Route path="/product" element = {<Component.PageProduct/>}></Route>
      <Route path="/fact" element = {<Component.PageFact/>}></Route>
      <Route path="/cart" element = {<Component.PageCart/>}></Route>
      <Route path="/Admin" element = {<Component.PageAdmin/>}></Route>

    </Routes>
    
    <Component.Footer/>
    </>
  );
}

export default App;
