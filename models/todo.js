import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:String
    },
    todo:{
        type : String        
    },
    date:{
        type:Date,
        default: Date.now 
    }
})


const Todo = mongoose.models.Todo ||  mongoose.model("Todo",todoSchema);

export default Todo;