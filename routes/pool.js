var mysql=require("mysql")
var pool=mysql.createPool(
    {
        host:'localhost',
        port:3306,
        user:'root',
        password:'root123',
        database:'employee',
        multipleStatements:true,
        connectionLimit:100
    })
    module.exports=pool;