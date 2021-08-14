const mysql = require("mysql");
const credConfig = require("./config");

const dbConn = mysql.createConnection({
  host: credConfig.dbHost,
  user: credConfig.dbUser,
  port: credConfig.dbPort,
  password: credConfig.dbPassword,
  database: "products",
});

function handleDisconnect() {
  dbConn.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
    console.log("MySql connected...");
  });

  dbConn.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      return handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

const dbAction = (sql, callback) => {
  dbConn.query(sql, function (err, results) {
    if (err) {
      throw err;
    }
    return callback(results);
  });
};

const dbEnd = () => dbConn.end();

module.exports = { dbAction, dbEnd };
