const mongoose=require('mongoose');
const authorschema=mongoose.Schema
(   {
        author_id:Number,
        name:String,
        books:[String]
   }
);
const AuthorModel=mongoose.model("authors",authorschema);
module.exports=AuthorModel;