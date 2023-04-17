const mysql = require('mysql2');
const config = {
    host: 'localhost',
    user: 'root',
    port : 3306,
    password:'',
    database: 'codingTech_db'
}
const  connection = mysql.createPool(config);





module.exports = connection.promise()//module.export kankhedmo bih bach ndeclariw les objets onkhedmo bihom f projet kaml