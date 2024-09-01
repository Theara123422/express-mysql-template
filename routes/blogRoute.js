import { Router } from "express";
import pool from "../database/db_connect.js";

const blogRoute = Router();
//redirect to add blog page
blogRoute.get('/addblogpage' , (request,response) =>{
    response.render('add.ejs');
});
//add new blog route
blogRoute.post('/createblog' , (request,response)=> {
    const { title , description } = request.body;
    console.log(title+description);
    
    pool.query(`INSERT INTO blog (title,description) VALUES(?,?)`,[title,description],(error,result)=>{
        if(error) return response.status(500).json({
            message : "Something went wrong"
        })
        response.redirect('/');
    });
});
//handle route delete blog
blogRoute.post('/removeblog/:id' , (request,response) => {
    const { id } = request.params;
    console.log(id);
    
    pool.query(`DELETE FROM blog WHERE id = ?`,id,(error,result) => {
        if(error) return response.status(500).json({
            message : "Something went wrong"
        });
        response.redirect('/');
    })
})
blogRoute.get('/editblogpage/:id' ,(request,response) => {
    const { id } = request.params;

    pool.query(`SELECT * FROM blog WHERE id = ?`,id,(error,row) => {
        if(error) return response.status(500).json({
            message : "Something went wrong"
        });
        response.render('edit.ejs' , {
            data : row[0]
        })
    })
})
blogRoute.post('/editblog/:id' ,(request,response) => {
    const { id } = request.params;
    const { title,description } = request.body;

    pool.query(`UPDATE blog SET title = ?,description = ? WHERE id = ?`,[title,description,id],(error,result) => {
        if(error) return response.status(500).json({
            message : "Something went wrong"
        });
        response.redirect('/');
    });
});
export default blogRoute;