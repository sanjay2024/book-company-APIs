//main backend code
const BookModel=require('./database1/book.js');
const AuthorModel=require("./database1/author.js");
const PublicationModel=require("./database1/publishment.js");

//importation of mongodb
const mongoose=require('mongoose');
var mongoDb="mongodb+srv://sanjay123:skcet123@cluster0.n36yt.mongodb.net/book-company-db?retryWrites=true&w=majority";
mongoose.connect(mongoDb,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("CONNECTION ESTABLISHED"));
const express=require('express');
const { request, json } = require("express");
const publicationModel = require('./database1/publishment.js');
const app=express();
//epxress.json()
app.use(express.json());



//********************  BOOK(get/post/put/delete APIs)**********************
/*     
       ROUTE :LOCALHOSH:3000
       DESCRIPTION: WELCOME MESSAGE
       ACCESS: PUBLIC
       PARAMETERS: NONE
       METHODS: GET
*/
 
//http://localhost:3000/
app.get('/',(req,res) =>
{
         res.json({"welcome": "to our book software company"});//it is the most prefered response

})

/*     
       ROUTE : /books
       DESCRIPTION: GET ALL BOOKS
       ACCESS: PUBLIC
       PARAMETERS: NONE
       METHODS: GET
*/


//http://localhost:3000/books
app.get('/books',async(req,res) =>
{
        const GetAllBooks=await BookModel.find();
        return res.json(GetAllBooks); //it is the most prefered response
        //res.send()
})


/*     

       ROUTE : /book-isbn/:isbn
       DESCRIPTION: GET SPECIFICBOOK
       ACCESS: PUBLIC
       PARAMETERS: isbn
       METHODS: GET
*/

//http://localhost:3000/book-isbn/12345ONE
app.get("/book-isbn/:isbn",async(req,res)=>
{
        // console.log(req.params);
        const {isbn}=req.params;
        const GetspecificbBook=await BookModel.find({ISBN: isbn});
        if(GetspecificbBook.length===0)
        {
                return res.json({"error":`there is no specified ${isbn}`});
        }
        
        return res.json(GetspecificbBook);
})

/*     
       ROUTE : /book-category/:category
       DESCRIPTION: GET SPECIFIC BOOK BY CATEGORY
       ACCESS: PUBLIC
       PARAMETERS: category
       METHODS: GET
*/

//http://localhost:3000/book-category/tech
app.get("/book-category/:category",async(req,res)=>
{
        const {category}=req.params;
        const GetspecificbBook=await BookModel.find({category:category});
        if(GetspecificbBook.length===0)
        {
                return res.json({"error":`There is no such books with category: ${category}`})
        }
        return res.json(GetspecificbBook);
})

/*     
       ROUTE : /book
       DESCRIPTION:CREATE BOOKS
       ACCESS: PUBLIC
       PARAMETERS: NONE
       METHODS: POST
*/

//http://localhost:3000/book
app.post("/book",async(req,res)=>
{
       console.log(req.body);
       const AddBook=await BookModel.create(req.body);
       return res.json(
       {
               book:AddBook,
               message:"successfully added"


       }
       );
})

/*     
       ROUTE : /book-update/:isbn
       DESCRIPTION: UPDATE BOOKS
       ACCESS: PUBLIC
       PARAMETERS: isbn
       METHODS:PUT
*/

//http://localhost:3000/book-update/12345Two
app.put("/book-update/:isbn",async(req,res)=>
{
        console.log(req.body);
        const {isbn}=req.params;
        let updateBook= await BookModel.findOneAndUpdate({ISBN:isbn},req.body,{new:true});
        if(updateBook===null)
        {
                return res.json(`"error":there is no such isbn like ${isbn}`)
        }
        return res.json({updatedBook:updateBook,message:"successfully updated"});
        
})

/*     
       ROUTE : /book-delete/:isbn
       DESCRIPTION: DELETE BOOKS
       ACCESS: PUBLIC
       PARAMETERS: isbn
       METHODS:DELETE
*/


//http://localhost:3000/book-delete/12345Two
app.delete("/book-delete/:isbn",async(req,res)=>
{
        const {isbn}=req.params;
        const DeletedBook=await BookModel.deleteOne({ISBN:isbn});
        if(DeletedBook.length===0)
        {
                return res.json(`"error":no data is deleted`)
        }
        return res.json({deletedcount:DeletedBook,message:"succesfullydeleted"})

})

/*     
       ROUTE : /book-delete-author/:isbn/:author_id
       DESCRIPTION: DELETE BOOKS
       ACCESS: PUBLIC
       PARAMETERS:isbn and author_id
       METHODS:DELETE
*/


//http://localhost:3000/book-delete-author/12345Two/1
app.delete("/book-author-delete/:isbn/:author_id",async(req,res)=>
{
        const {isbn,author_id}=req.params;
        let GetspecificbBook=await BookModel.findOne({ISBN:isbn});
        if(GetspecificbBook.length===0)
        {
                return res.json(`"error:"there is no such isbn like ${isbn}"`);
        }
        else
        {
                GetspecificbBook.authors.remove(author_id)
                let updateBook=await BookModel.findOneAndUpdate({ISBN:isbn},GetspecificbBook,{new:true});
                return res.json({BookUpdated:updateBook,message:"Author was successfully deleted"});
        }
})



//********************  AUTHOR(get/post/put/delete APIs)**********************
/*     
       ROUTE :/authors
       DESCRIPTION: GET ALL AUTHORS
       ACCESS: PUBLIC
       PARAMETERS:NONE
       METHODS:GET
*/

app.get("/authors",async(req,res)=>
{
        const GetAuthors=await AuthorModel.find();
        if(GetAuthors.length===0)
        {
                return res.json(`"error":no author detailed is stored`);
        }
        return res.json(GetAuthors);
})

/*     
       ROUTE :/author-id/:author_id
       DESCRIPTION: GET SPECIFIC AUTHOR BY AUTHOR ID 
       ACCESS: PUBLIC
       PARAMETERS:author_id
       METHODS:GET
*/

//http://localhost:3000/author-id/3
app.get("/author-id/:author_id",async(req,res)=>
{
        const {author_id}=req.params;
        const GetAuthors=await AuthorModel.find({author_id:author_id});
        if(GetAuthors.length===0)
        {
                return res.json(`"error":no author_id like  ${author_id}`);
        }
        return res.json(GetAuthors);
})

/*     
       ROUTE :/author-create
       DESCRIPTION: CREATE AUTHOR
       ACCESS: PUBLIC
       PARAMETERS:NONE
       METHODS:POST
*/

//http://localhost:3000/author-create
app.post("/author-create",async(req,res)=>
{
        const CreateAuthor=await AuthorModel.create(req.body)
        return res.json({authors:CreateAuthor,message:"author is successfully created"});

})

/*     
       ROUTE :/author-update/:authorid
       DESCRIPTION: UPDATE AUTHOR
       ACCESS: PUBLIC
       PARAMETERS:author_id
       METHODS:PUT
*/

//http://localhost:3000/author-update/3
app.put("/author-update/:author_id",async(req,res)=>
{
        const {author_id}=req.params;
        const UpdateAuthor=await AuthorModel.findOneAndUpdate({author_id:author_id},req.body,{new:true});
        if(UpdateAuthor===null)
        {
                res.json(`{"error:there is no such isbn like ${author_id}"}`)
        }
        return res.json({authors_update:UpdateAuthor,message:"author is successfully updated"});

})

/*     
       ROUTE :/author-delete/:author_id
       DESCRIPTION: DELETE AUTHOR
       ACCESS: PUBLIC
       PARAMETERS:author_id
       METHODS:POST
*/

//http://localhost:3000/author_delete/4
app.delete("/author_delete/:author_id",async(req,res)=>
{
        console.log(req.params)
        let{author_id}=req.params;
        author_id=Number(author_id)
        const Authordelete= await AuthorModel.deleteOne({author_id:author_id})
        return res.json({deletedauthor:Authordelete,message:"successfully deleted the author"});

})


/*     
       ROUTE :/author-create
       DESCRIPTION: DELETE AUTHOR PARTICULAR DOCUMENT
       ACCESS: PUBLIC
       PARAMETERS:author_id and isbn
       METHODS:DELETE
*/

//http://localhost:3000/author-delete-isbn/4/12345four
app.delete("/author-delete-isbn/:author_id/:isbn",async(req,res)=>
{
        const {author_id,isbn}=req.params;
        let GetspecificAuthor=await AuthorModel.findOne({author_id:author_id});
        if(GetspecificAuthor===null)
        {
                return res.json(`"error":"there is no such auhtor_id like ${author_id}"`);
        }
        else
        {
                GetspecificAuthor.books.remove(isbn);
                let UpdateAuthor= await AuthorModel.findOneAndUpdate({author_id:author_id},GetspecificAuthor,{new:true});
                return res.json({updatedAuthor:UpdateAuthor,message:"author book detail is successfully deleted"});
        }
})


//********************  AUTHOR(get/post/put/delete APIs)**********************


/*     
       ROUTE :/publications
       DESCRIPTION:GET ALL PUBLICATION
       ACCESS: PUBLIC
       PARAMETERS:NONE
       METHODS:GET
*/

//http://localhost:3000/publications
app.get("/publications",async(req,res)=>
{
        const GetspecificPublication=await publicationModel.find();
        if(GetspecificPublication.length===0)
        {
                return res.json(`error: there is no publication stored`);
        }
        return res.json(GetspecificPublication);
})

/*     
       ROUTE :/publications
       DESCRIPTION:GET ALL SPECIFIC PUBLICATION BY NAME
       ACCESS: PUBLIC
       PARAMETERS:name
       METHODS:GET
*/

//http://localhost:3000/publication-name/veerakumar publication
app.get("/publication-name/:name",async(req,res)=>
{
        const {name}=req.params;
        const GetspecificPublication=await PublicationModel.find({name:name});
        if(GetspecificPublication.length===0)
        {
                return res.json({"error":`There is no such books with category: ${name}`})
        }
        return res.json(GetspecificPublication);
})

/*     
       ROUTE :/publications
       DESCRIPTION:CREATE PUBLICATION
       ACCESS: PUBLIC
       PARAMETERS:NONE
       METHODS:POST
*/

//http://localhost:3000/publication
app.post("/publication",async(req,res)=>
{
        const CreatePublisher=await publicationModel.create(req.body)
        return res.json({publication:CreatePublisher,message:"publications is successfully created"});
})

/*     
       ROUTE :/publication-update/:name
       DESCRIPTION:UPDATE PUBLICATION
       ACCESS: PUBLIC
       PARAMETERS:name
       METHODS:PUT
*/

//http://localhost:3000/publication-update/veerakumarpublication
app.put("/publication-update/:name",async(req,res)=>
{
        const {name}=req.params;
        const Updatepublication=await publicationModel.findOneAndUpdate({name:name},req.body,{new:true});
        if(Updatepublication===null)
        {
                return res.json(`error:there is no publication name like ${name}`);
        }
        return res.json(Updatepublication)
})

/*     
       ROUTE :/publication-delete/:name
       DESCRIPTION:DELETE PUBLICATION
       ACCESS: PUBLIC
       PARAMETERS:name
       METHODS:DELETE
*/

//http://localhost:3000/publication-delete/santhosh publication
app.delete("/publication-delete/:name",async(req,res)=>
{
        const {name}=req.params;
        const Deletedpublication=await publicationModel.deleteOne({name:name})
        if(Deletedpublication.length===0)
        {
                return res.json(`"error":no data is deleted`)
        }
        return res.json({deletedcount:Deletedpublication,message:"succesfullydeleted"})

})

/*     
       ROUTE :/publication-delete-books/:name
       DESCRIPTION:DELETE PUBLICATIONS BOOKS
       ACCESS: PUBLIC
       PARAMETERS:name and isbn
       METHODS:DELETE
*/

//http://localhost:3000/publication-delete-books/ad santhosh publication/12345three
app.delete("/publication-delete-books/:name/:isbn",async(req,res)=>
{
        const {name,isbn}=req.params;
        let GetspecificPublication=await PublicationModel.findOne({name:name});
        if(GetspecificPublication===null)
        {
                return res.json(`"error":"there is no such auhtor_id like ${isbn}"`);
        }
        else
        {
                GetspecificPublication.books.remove(isbn);
                let Updatepublication= await publicationModel.findOneAndUpdate({name:name},GetspecificPublication,{new:true});
                return res.json({updatedPublication:Updatepublication,message:"publicationbook detail is successfully deleted"});
        }
})


app.listen(3000,()=>
{
        console.log("My Express js live server is Running");
});
