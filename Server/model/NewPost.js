const mongoose  = require('mongoose');
const {Schema,model}=mongoose;

const PostSchema= new mongoose.Schema({
    userpost:String,
    img:String,
    //auther:{type:Schema.Types.ObjectId,ref:'User'},
},{
    timestamps:true,
});


const postModel = new model("Post",PostSchema);
module.exports = postModel;