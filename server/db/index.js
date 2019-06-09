const mysql = require("mysql");

const dbConfig = {
    host: "sql2.freemysqlhosting.net",
    port: 3306,
    user: "sql2294719",
    password: "gJ1*vH5*",
    database: "sql2294719"
};

let connection = null;

function connect(){
    connection = mysql.createConnection(dbConfig);

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(connect, 2000);
        } else {
            console.log("Db connected");
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log(`loosed connection ${Date.now()}`);
            connect();
        } else {
            throw err;
        }
    });
}
connect();

module.exports = connection;