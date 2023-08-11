import dbConnect from "../../../../utils/dbconnect"
import Todo from "../../../../models/todo"
import { redirect } from "next/navigation"

export default async function Edit({params}){
  dbConnect();
  const todos= await Todo.findOne ({_id: params.id })
  async function updateTodo(data){
    "use server"
    let title= data.get("title")?.valueOf();
    let todo = data.get("todo")?.valueOf();
    let updateTodo = await Todo.findByIdAndUpdate({_id:params.id},{title, todo})
    console.log(updateTodo);
    redirect("/show")
  }
    return(
        <main className="m-10 apsce-y-5">
      <h1 className="text-xl font-bold">Create Todo</h1>
      <form action= {updateTodo} >
        <div className="">
          <label htmlFor="title" className="text-lg">
            Title
          </label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={todos.title}
            className="w-[100%] bg-slate-200 h-10 p-3 text-slate-900"
          />
        </div>
        <div className="">
          <label htmlFor="Todo" className="text-lg">
            Todo
          </label>
          <br />
          <input
            type="text"
            name="todo"
            id="todo"
            defaultValue={todos.todo}
            className="w-[100%] bg-slate-200 h-10 p-3 text-slate-900"
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-yellow-400 m-3 font-bold hover:bg-orange-400 hover:text-white"
        >
          SUBMIT
        </button>
      </form>
    </main>
        )
}