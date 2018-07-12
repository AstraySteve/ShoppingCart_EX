var mysql = require("mysql");

function login() {
    return mysql.createConnection({
        host: "localhost", //127.0.0.1 ip address
        user: "root",
        password: "root",
        port: 3306, //3306 default port, (optional unless you are using a different port)
        database: "hat_store",
        multipleStatements: true
    });
}

module.exports = {
    login: login
}