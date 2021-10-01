//main backend code
let db=require("./database1/index.js");

const express=require('express');
const app=express();
//epxress.json()
app.use(express.json());
//http://localhost:3000/
// const { MongoClient } = require('mongodb');
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://sanjay123:skcet123@cluster0.n36yt.mongodb.net/book-company-db?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company-db").collection("books").findOne({ISBN:"12345One"});
//   bcollection.then((data)=>console.log(data))
//   // perform actions on the collection object
//   client.close();
// });
//one methode to coonenct mongo db
// let main=async()=>
// {
//         const uri = "mongodb+srv://sanjay123:skcet123@cluster0.n36yt.mongodb.net/book-company-db?retryWrites=true&w=majority";
//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         try
//         {
//                 await client.connect();
//                 let result=await client.db("book-company-db").collection("books").findOne({ISBN:"12345One"});
//                 console.log(result);
//         }
//         catch(err)
//         {
//                 console.log(err);
//         }
//         finally
//         {
//                 client.close();
//         }
// }
// main();
app.get('/',(req,res) =>
{
         res.json({"welcome": "to our book software company"});//it is the most prefered response

        // res.send(db.books);
//         res.json(db.author);
})
//http://localhost:3000/allbooks
app.get('/allbooks',(req,res) =>
{
        const GetAllBooks=db.books;
        return res.json(GetAllBooks); //it is the most prefered response
        //res.send()
})
//http://localhost:3000/book-isbn/12345ONE
app.get("/book-isbn/:isbn",(req,res)=>
{
        console.log(req.params);
        const {isbn}=req.params;
        const GetspecificbBook=db.books.filter((book)=>book.ISBN===isbn)
        if(GetspecificbBook.length===0)
        {
                return res.json({"error":`there is no specified ${isbn}`});
        }
        
        return res.json(GetspecificbBook[0]);
})
//http://localhost:3000/book-category/tech
app.get("/book-category/:category",(req,res)=>
{
        const {category}=req.params;
        const GetspecificbBook=db.books.filter((book)=>book.category.includes(category));
        if(GetspecificbBook.length===0)
        {
                return res.json({"error":`because of unspecified ${category}`})
        }
        return res.json(GetspecificbBook);
})
//http://localhost:3000/authors
app.get("/authors",(req,res)=>
{
        const getAllauthors=db.authors;
        return res.json(getAllauthors);
})
//http://localhost:3000/author-id/1
app.get("/author-id/:ID",(req,res)=>
{
        let {ID}=req.params;
        ID=Number(ID)
        const getauthorById=db.authors.filter((author)=>author.id===ID);
        if(getauthorById.length===0)
        {
                return res.json(`"error":"unspecified author name ${ID}"`)
        }
        return res.json(getauthorById);
})
//http://localhost:3000/author-isbn/12345One
app.get("/author-isbn/:isbn",(req,res)=>
{
        const {isbn}=req.params;
        console.log(isbn)
        const GetAuthorByisbn=db.authors.filter((author) => author.books.includes(isbn));
        if(GetAuthorByisbn.length===0)
        {
                return res.json(`"error":not specified isb ${isbn}`);
        }
        return res.json(GetAuthorByisbn);
})
//http://localhost:3000/Allpublications
app.get("/Allpublications",(req,res)=>
{
        const getAllPublications=db.publications;
        return res.json(getAllPublications);
})
//http://localhost:3000/publication-id/1
app.get("/publication-id/:id",(req,res)=>
{
        let {id}=req.params;
        id=Number(id);
        const getpublicationById=db.publications.filter((publication)=>publication.id===id);
        if(getpublicationById.length===0)
        {
                return res.json(`"error":"not specified publication id ${id}"`);
        }
        return res.json(getpublicationById);
})
//http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn",(req,res)=>
{
        let {isbn}=req.params;
        const getpublicationByisbn=db.publications.filter((publication)=>publication.books.includes(isbn));
        if(getpublicationByisbn.length===0)
        {
                return res.json(`"error":"not specified publication isbn ${isbn}"`);
        }
        return res.json(getpublicationByisbn);
})
//http://localhost:3000/book
app.post("/book",(req,res)=>
{
       console.log(req.body);
       db.books.push(req.body);
       return res.json(db.books);

})
//http://localhost:3000/author
app.post("/author",(req,res)=>
{
       console.log(req.body);
       db.authors.push(req.body);
       return res.json(db.authors);

})
//http://localhost:3000/publication
app.post("/publication",(req,res)=>
{
        console.log(req.body)
        db.publications.push(req.body);
        return res.json(db.publications);
})

//http://localhost:3000/book-update/12345Two
app.put("/book-update/:isbn",(req,res)=>
{
        console.log(req.body);
        // console.log(req.params);
        const {isbn}=req.params;
        db.books.forEach((book)=>
        {
                if(book.ISBN===isbn)
                {
                        return {...book,...req.body};
                        
                }
                return book;
        })
        // console.log(db.books)
        return res.json(db.books);
})
app.put("/author-update/:id",(req,res)=>
{
        console.log(req.body);
        let {id}=req.params;
        id=Number(id);
        db.books.forEach((author)=>
        {
                if(author.id===id)
                {
                        console.log({...author,...req.body});
                        return {...author,...req.body};
                        
                }
                return author
        })
        return res.json(db.authors);
})
//http://localhost:3000/book-delete/12345Two
app.delete("/book-delete/:isbn",(req,res)=>
{
        const {isbn}=req.params;
        const filterBook=db.books.filter((book)=>book.ISBN!==isbn);
        console.log(filterBook);
        db.books=filterBook;
        return res.json(db.books);
        
})
//http://localhost:3000/book-delete-author/12345Two/1
app.delete("/book-author-delete/:isbn/:id",(req,res)=>
{
        let {isbn,id}=req.params;
        id=Number(id);
        db.books.forEach((book)=>
        {
                if(book.ISBN===isbn)
                {
                        if(!book.authors.includes(id))
                        {
                                return;
                        }
                        book.authors=book.authors.filter((author)=> author!==id)
                        console.log(book);
                        return book;
                }
        })
        return res.json(db.books)
})
//http://localhost:3000/auhtor-delete-book/1/12345One
app.delete("/auhtor-delete-book/:id/:isbn",(req,res)=>
{
        let { id,isbn}=req.params;
        db.authors.forEach((author)=>
        {
                if(author.id==id)
                {
                        if(!author.books.includes(isbn))
                        {
                                return;
                        }
                        author.books=author.books.filter((book)=>book!==isbn);
                        console.log(author)
                        return author;
                }
        })
})
app.listen(3000,()=>
{
        console.log("My Express js live server is Running");
});
