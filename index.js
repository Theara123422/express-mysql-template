import express from 'express';
import blog from './blog.js';
const app = express();

// setting up ejs(embeded javascript)
app.set('view engine' , 'ejs'); //set our view engine to ejs
app.set('views','views');//set ./views folder as views

app.get('/' , (request,response) => {
    response.render('index.ejs',{
        data : blog
    });
});
app.get('/addBlog' , (request,response) => {
    response.render('add.ejs');
})




app.listen(3000 , () => {
    console.log(`Server is running on http://localhost:3000`);
})