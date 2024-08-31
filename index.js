import express from 'express';
import pool from './database/db_connect.js';
import blogRoute from './routes/blogRoute.js';
const app = express();

app.use(express.urlencoded({extended : true}))
// setting up ejs(embeded javascript)
app.set('view engine' , 'ejs'); //set our view engine to ejs
app.set('views','views');//set ./views folder as views
pool.getConnection((error , connection) => {
    if(error) return console.log("Failed");
    console.log("Success Connection");
    connection.release();
});
app.get('/' , (request,response) => {
    pool.query(`SELECT * FROM blog WHERE 1` , (error,rows) => {
        if(error) return response.status(500).json({
            message : "Something went wrong"
        })
        response.render('index.ejs' , {
            data : rows
        })
    })
})
app.use('/blog' , blogRoute)
app.listen(3000 , () => {
    console.log(`Server is running on http://localhost:3000`);
})  