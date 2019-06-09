const db = require("../db");

db.query("CREATE TABLE IF NOT EXISTS users(student_id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(20))");

class User {
    constructor(name){
        this.name = name;
    }

    save(){
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO users(name) VALUES (?)", [this.name], (err, rows) => {
                if(err) reject(err);
                resolve(true);
            })
        })
    }

    static addUser({ name }) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO users(name) VALUES (?)", [name], (err, rows) => {
                if(err) reject(err);
                resolve(true);
            })
        })
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users", (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            });
        })
    }

    static getUserById(id){
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            })
        })
    };
}

module.exports = User;