const path = require('path');
const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/build')));

const connection = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b93ddcf626d799",
  password: "c77e843b",
  database: "heroku_838af19cff2620a",
});

connection.connect(function (err) {
  err ? console.log(err) : console.log(connection);
});

app.get("/api/sanphamhome", (req, res) => {
  var sql = 'SELECT * FROM sanpham where malsp = "cabetta" limit 4';
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ sanpham: results });
    console.log(results);
  });
});
app.post("/api/register", (req, res) => {
  console.log(req);
  Name = req.body.Name;
  Phone = req.body.Phone;
  Email = req.body.Email;
  Password = req.body.Password;
  connection.query(
    "insert into khachhang (makh,tenKH,sdt) values ('KH002',?,?)",
    [Name, Phone],
    function (err, results) {
      console.log(err);
    }
  );
  connection.query(
    "insert into taikhoan (tk,mk,makh) values (?,?,'KH002')",
    [Email, Password],
    function (err, results) {
      console.log(err);
    }
  );
});
app.post("/api/login", (req, res) => {
  Email = req.body.Email;
  Password = req.body.Password;

  connection.query(
    "select * from taikhoan t join khachhang k on t.makh=k.makh where tk=? and mk=?",
    [Email, Password],
    function (err, results) {
      if (err) {
        res.send({ err: err });
      }
      if (results.length > 0) {
        res.send(results);
      } else {
        res.send({ message: "Sai tài khoản hoặc mật khẩu!!!" });
      }
    }
  );
});
app.get("/api/trangtrihome", (req, res) => {
  var sql = 'SELECT * FROM sanpham where malsp = "trangtri" limit 4';
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ trangtri: results });
    console.log(results);
  });
});

app.get("/api/product", (req, res) => {
  var sql = 'SELECT * FROM sanpham';
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ product: results });
    console.log(results);
  });
});

app.get("/api/typeproduct", (req, res) => {
  var sql = 'SELECT * FROM loaisanpham';
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ TypeProduct: results });
    console.log(results);
  });
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
