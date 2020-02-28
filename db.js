var mysql = require("mysql");

function login() {
    return mysql.createConnection({
        host: process.env.DBHOST || "localhost", //127.0.0.1 ip address
        user: process.env.DBUSER || "root",
        password: process.env.DBPASSWORD || "root",
        port: 3306, //3306 default port, (optional unless you are using a different port)
        database: process.env.DB || "hat_store",
        multipleStatements: true
    });
}

module.exports = {
    login: login
}