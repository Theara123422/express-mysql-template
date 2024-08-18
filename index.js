import express from 'express';
import blog from './blog.js';
const app = express();

app.use(express.urlencoded({extended : true}))
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
app.get('/edit/:id' , (request,response) => {
    const { id } = request.params;

    const selectedBlog = blog.find(blog => blog.id == id);
    response.render('edit.ejs',{
        data : selectedBlog
    })
})
app.post('/createBlog' , (request,response) => {
    const { title , desc } = request.body;

    if(!title && !desc) {
        return response.status(500).json({
            message : "Invalid Data"
        })
    }

    blog.push({
        id : blog.length + 1,
        title,
        description : desc
    });

    response.redirect('/');
});
app.post('/removeBlog/:id' , (request,response) => {
    const { id } = request.params;

    const foundBlog = blog.findIndex(blog => blog.id == id);

    if(foundBlog !== -1){
        blog.splice(foundBlog,1);
    }

    response.redirect('/');
});
app.post('/editBlog/:id' , (request,response) => {
    const { id } = request.params;
    const { title, desc } = request.body;

    if(!title && !desc) {
        return response.status(404).json({
            message : "Invalid Data"
        })
    }

    const foundBlog = blog.findIndex(blog => blog.id == id);

    if(foundBlog == -1){
        return response.status(404).json({
            message : "Blog Not Found"
        })
    }

    blog[foundBlog] = {
        id,
        title,
        description : desc
    }

    response.redirect('/')
})
app.listen(3000 , () => {
    console.log(`Server is running on http://localhost:3000`);
})