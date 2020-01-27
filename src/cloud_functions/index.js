const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 1,
  socketPath: "/cloudsql/" + "poolsapp-f3429:us-east1:prashant0268-db",
  user: "root",
  password: "ylMxoEg9Ik0bh2GM",
  database: "walmart"
});

const executeQuery = async (query, req, res) => {
  console.log(query);
  pool.query(query, req.body.id, function(e, results) {
    console.log(results);
    res.status(200).send(results);
  });
};

const respondToOptionsRequest = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  }
};

// Functions ------

exports.getUsers = (req, res) => {
  respondToOptionsRequest(req, res);
  executeQuery(`SELECT * FROM users;`, req, res);
};

exports.getItems = (req, res) => {
  respondToOptionsRequest(req, res);
  executeQuery(`SELECT * FROM items;`, req, res);
};

exports.getOrders = (req, res) => {
  respondToOptionsRequest(req, res);
  executeQuery(`SELECT * FROM orders;`, req, res);
};

exports.getOrderItems = (req, res) => {
  respondToOptionsRequest(req, res);
  executeQuery(`SELECT * FROM order_items;`, req, res);
};

exports.createOrder = (req, res) => {
  respondToOptionsRequest(req, res);
  executeQuery(
    `INSERT INTO orders (user_id) 
    VALUES (${req.body.user_id});`,
    req,
    res
  );
};

exports.createOrderItem = (req, res) => {
  respondToOptionsRequest(req, res);
  executeQuery(
    `INSERT INTO order_items (order_id, item_id) 
    VALUES (${req.body.order_id}, ${req.body.item_id});`,
    req,
    res
  );
};

exports.deleteOrderItem = (req, res) => {
  respondToOptionsRequest(req, res);
  executeQuery(
    `DELETE FROM order_items 
    WHERE order_id = ${req.body.order_id}
      AND item_id = ${req.body.item_id};`,
    req,
    res
  );
};

exports.deleteOrder = (req, res) => {
  respondToOptionsRequest(req, res);
  executeQuery(
    `DELETE FROM orders 
    WHERE order_id = ${req.body.order_id};`,
    req,
    res
  );
};
