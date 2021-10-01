const mongoose=require('mongoose')
const Publisherschema=mongoose.Schema(
        {
                Publisher_number:Number,
                name:String,
                books:[String]
        }
)
const publicationModel=mongoose.model("publications",Publisherschema)
module.exports=publicationModel;