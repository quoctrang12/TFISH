import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// var mysql = require('mysql'); // nhúng module mysql vào trang
// const db = mysql.createConnection ({
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    database: 'fish'  //tên database muốn kết nối
// });

// app.get("/books",(req,res)=>{
//   let sql = `SELECT * FROM books`;
//   app.set("view engine","ejs");
//   app.set("views","./views");
//   db.query(sql, function(err, data) { // biến data chứa kết quả truy vấn
//       if (err) throw err;
//       console.log(data);; //nạp view và truyền dữ liệu cho view
//   });
// });

// app.get("/tablecreate", () =>{
//   var sql = `CREATE TABLE books (
//           id INT(11) AUTO_INCREMENT PRIMARY KEY,
//           title VARCHAR(255),
//           slug VARCHAR(255),
//           price float,
//           description VARCHAR(4000),
//           imageURL VARCHAR(255),
//           showhide BOOLEAN,
//           idCat INT(11)
//       )`;
//   db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//   });
// });
// app.get("/addbook", (req, res)=>{  //Cách 1
//   let sql=`insert into books(title, price) values("Lĩnh Nam Chích Quái",350000)`;
//   db.query( sql , function(err, data) {
//       if (err) throw err;
//       res.send(data); // data chứa thông tin: số dòng chèn ...
//   });
// });
// app.get("/bookadd", (req, res)=>{  //Cách 2
//   var b = {title:'Ngự Dược Nhật Ký', price:'147000', slug:'ngu-duoc-nhat-ky'}
//   db.query("insert into books SET ? ", b , function(err, data) {
//       if (err) throw err;
//       res.send(data);
//   });
// });
// app.get("/books",(req,res)=>{
//   let sql = `SELECT * FROM books`;
//   app.set("view engine","ejs");
//   app.set("views","./views");
//   db.query(sql, function(err, data) { // biến data chứa kết quả truy vấn
//       if (err) throw err;
//       res.render('books',{listbooks:data}); //nạp view và truyền dữ liệu cho view
//   });
// });
