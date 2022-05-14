const path = require("path");
require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
 
app.use(express.static(path.resolve(__dirname, "../client/build")));

const connection = mysql.createConnection({
  host: process.env.REACT_APP_HOST,
  user: process.env.REACT_APP_USER,
  password: process.env.REACT_APP_PASSWORD,
  database: process.env.REACT_APP_DATABASE,
});

connection.connect(function (err) {
  err ? console.log(err) : console.log(connection);
});

app.get("/api/productshome", (req, res) => {
  var sql = "SELECT * FROM products limit 4";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ products: results });
    console.log(results);
  });
});
app.get("/api/trangtrihome", (req, res) => {
  var sql = "SELECT * FROM products where id_type = 8 limit 4";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ trangtri: results });
    console.log(results);
  });
});

app.get("/api/product", (req, res) => {
  var sql = "SELECT * FROM products";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ product: results });
    console.log(results);
  });
});
app.get("/api/typeproduct", (req, res) => {
  var sql = "SELECT * FROM type_products";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ TypeProduct: results });
    console.log(results);
  });
});

app.get("/api/getAllUser", (req, res) => {
  connection.query(
    "SELECT * FROM users join accounts on users.email = accounts.email",
    function (err, results) {
      if (err) throw err;
      res.send(results);
    }
  );
});
app.get("/api/getAllBill", (req, res) => {
  connection.query(
    "SELECT bills.id,create_at,address,total,status,name FROM bills join users on bills.id_user=users.id order by create_at desc",
    function (err, results) {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/api/register", (req, res) => {
  Name = req.body.Name;
  Phone = req.body.Phone;
  Email = req.body.Email;
  Password = req.body.Password;
  connection.query(
    "insert into accounts values (?,?,1)",
    [Email, Password],
    function (err, results) {
      if (err) {
        res.send({ message: "Đăng ký không thành công" });
      } else {
        connection.query(
          "insert into users (name,phone_number,email) values (?,?,?)",
          [Name, Phone, Email]
        );
        res.send({ message: "success" });
      }
    }
  );
});
app.post("/api/login", (req, res) => {
  Email = req.body.Email;
  Password = req.body.Password;
  connection.query(
    "select * from accounts t join users k on t.email=k.email where t.email=? and t.password=?",
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
    "select * from products where name_product like ?",
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

app.post("/api/addCart", (req, res) => {
  id_product = req.body.id_product;
  id_user = req.body.id_user;
  count = req.body.count;
  connection.query(
    "select * from carts where id_product=? and id_user=?",
    [id_product, id_user],
    function (err, results) {
      if (err) {
        res.send(err);
      }
      if (results.length > 0) {
        count = count + results[0].count;
        connection.query(
          "update carts set count=? where id_product=? and id_user=?;",
          [count, id_product, id_user],
          function (err, results) {
            if (err) {
              res.send({ err: err });
            }
          }
        );
      } else {
        connection.query(
          "insert into carts (id_product, id_user,count) value (?, ?, ?)",
          [id_product, id_user, count],
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
app.post("/api/getCart", (req, res) => {
  id_user = req.body.id_user;
  connection.query(
    "select * from carts g join products s on g.id_product=s.id where g.id_user=?",
    [id_user],
    function (err, results) {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ product: results });
      }
    }
  );
});
app.post("/api/delete", (req, res) => {
  id_product = req.body.id_product;
  id_user = req.body.id_user;
  connection.query(
    "DELETE FROM carts WHERE id_product=? AND id_user = ?;",
    [id_product, id_user],
    function (err, results) {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(id_product);
      }
    }
  );
});
app.post("/api/deleteAllCart", (req, res) => {
  id_user = req.body.id_user;
  connection.query(
    "select * from carts where id_user=?",
    [id_user],
    function (err, results) {
      if (err) {
        res.send({ err: err });
      }
      results.forEach((res) => {
        connection.query(
          "DELETE FROM carts WHERE id_product=? AND id_user = ?;",
          [res.id_product, id_user]
        );
      });
    }
  );
});
app.post("/api/pay", (req, res) => {
  id_user = req.body.id_user;
  address = req.body.address;
  total = req.body.total;
  connection.query(
    "insert into bills(id_user,create_at,address,total,payment,status) values(?,now(),?,?,'Thanh toán khi nhận hàng','Đang xác nhận')",
    [id_user, address, total],
    function (err, results) {
      if (err) {
        res.send({ err: err });
      } else {
        mahd = results.insertId;
        connection.query(
          "select * from carts where id_user=?",
          [id_user],
          function (err, results) {
            if (err) {
              res.send({ err: err });
            }
            results.forEach((res) => {
              connection.query("insert into bill_detail values(?,?,?)", [
                mahd,
                res.id_product,
                res.count,
              ]);
              connection.query(
                "DELETE FROM carts WHERE id_product=? AND id_user = ?;",
                [res.id_product, id_user]
              );
            });
          }
        );
        res.send(results);
      }
    }
  );
});

app.post("/api/getBill", (req, res) => {
  id_user = req.body.id_user;
  status = req.body.status;
  connection.query(
    "Select * from bills where id_user = ? and status=?",
    [id_user, status],
    function (err, results) {
      res.send(results);
      if (err) {
        res.send({ err: err });
      }
    }
  );
});
app.post("/api/getDetailBill", (req, res) => {
  mahd = req.body.mahd;
  connection.query(
    "Select * from bill_detail c  join products s on c.id_product=s.id where id_bill =?",
    [mahd],
    function (err, results) {
      res.send(results);
      if (err) {
        res.send({ err: err });
      }
    }
  );
});
app.post("/api/setStatusBill", (req, res) => {
  maHD = req.body.maHD;
  statu = req.body.status;
  connection.query(
    "Update bills set status = ? where id = ?",
    [statu, maHD],
    function (err, results) {
      if (err) throw err;
      res.send(results);
    }
  );
});
app.post("/api/sortBill", (req, res) => {
  column = req.body.sortBy;
  sort = req.body.sort;
  console.log(column, sort);
  sql =
    "SELECT * FROM bills join users on bills.id_user=users.id_user order by  " +
    column +
    " " +
    sort;
  connection.query(sql, function (err, results) {
    console.log(sql);
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/addProduct", (req, res) => {
  name_product = req.body.name;
  des = req.body.des;
  image = req.body.image;
  price = req.body.price;
  size = req.body.size;
  id_type = req.body.id_type;
  connection.query(
    "insert into products(name_product, price, size, linkimg, des, id_type) values(?,?,?,?,?,?)",
    [name_product, price, size, image, des, id_type],
    function (err, results) {
      if (err) throw err;
      console.log(results);
    }
  );
});
app.post("/api/sortProduct", (req, res) => {
  column = req.body.sortBy;
  sort = req.body.sort;
  console.log(column, sort);
  sql = "SELECT * FROM products ORDER BY " + column + " " + sort;
  connection.query(sql, function (err, results) {
    console.log(sql);
    if (err) throw err;
    res.send(results);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
