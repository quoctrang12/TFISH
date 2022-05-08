const path = require("path");
const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../client/build")));

// const connection = mysql.createConnection({
//   host: "us-cdbr-east-05.cleardb.net",
//   user: "b93ddcf626d799",
//   password: "c77e843b",
//   database: "heroku_838af19cff2620a",
// });
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "qlfish",
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
app.post("/api/addgiohang", (req, res) => {
  masp = req.body.masp;
  makh = req.body.makh;
  soluong = req.body.soluong;
  connection.query(
    "select * from giohang where masp=? and makh=?",
    [masp, makh],
    function (err, results) {
      if (err) {
        res.send(err);
      }
      if (results.length > 0) {
        soluong = soluong + results[0].soluong;
        connection.query(
          "update giohang set soluong=? where masp=? and makh=?;",
          [soluong, masp, makh],
          function (err, results) {
            if (err) {
              res.send({ err: err });
            }
          }
        );
      } else {
        connection.query(
          "insert into giohang (masp, makh,soluong) value (?, ?, ?)",
          [masp, makh, soluong],
          function (err, results) {
            if (err) {
              res.send({ err: err });
            }
          }
        );
      }
    }
  );
});
app.post("/api/getgiohang", (req, res) => {
  makh = req.body.makh;
  connection.query(
    "select * from giohang g join sanpham s on g.masp=s.masp where g.makh=?",
    [makh],
    function (err, results) {
      if (err) {
        res.send({ err: err });
      } else {
        res.json({ product: results });
      }
    }
  );
});
app.post("/api/delete", (req, res) => {
  masp = req.body.masp;
  makh = req.body.makh;
  connection.query(
    "DELETE FROM giohang WHERE masp=? AND makh = ?;",
    [masp, makh],
    function (err, results) {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(masp);
      }
    }
  );
});
app.post("/api/register", (req, res) => {
  Name = req.body.Name;
  Phone = req.body.Phone;
  Email = req.body.Email;
  Password = req.body.Password;
  connection.query(
    "insert into khachhang (tenKH,sdt) values (?,?)",
    [Name, Phone],
    function (err, results) {
      let id = results.insertId;
      connection.query(
        "insert into taikhoan (tk,mk,maKH) values (?,?,?)",
        [Email, Password, id],
        function (err, results) {
          if (err) {
            res.send({ message: "Tài khoản đã tồn tại" });
            connection.query(
              "delete from khachhang where makh = ?",
              [id],
              function (err, results) {
                console.log(err);
              }
            );
          } else {
            res.send({ message: "success" });
          }
        }
      );
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
app.post("/api/search", (req, res) => {
  content = req.body.content;
  // context = "%"+content+"%"
  connection.query(
    "select * from sanpham where tensp like ?",
    ["%" + content + "%"],
    function (err, results) {
      if (err) {
        res.send({ err: err });
      } else {
        res.json({ product: results });
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
  var sql = "SELECT * FROM sanpham";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ product: results });
    console.log(results);
  });
});

app.get("/api/typeproduct", (req, res) => {
  var sql = "SELECT * FROM loaisanpham";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ TypeProduct: results });
    console.log(results);
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
