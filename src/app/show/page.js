import Link from "next/link";
import Todo from "../../../models/todo";
import dbConnect from "../../../utils/dbconnect";
import { redirect } from "next/navigation";

export default async function Show() {
  dbConnect();
  const todos = await Todo.find();

  async function deleteTodo(data) {
    "use server";
    try {
      let id = JSON.parse(data.get("id")?.valueOf());
      await Todo.deleteOne({ _id: id });
      console.log("delete");
    } catch (error) {
    } finally {
      redirect("/show");
    }
  }
  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">TODOS</h1>
      <div>
        <ul className="flex font-bold">
          <li className="flex-1">Title</li>
          <li className="flex-1">Todo</li>
          <li className="flex-1">Options</li>
        </ul>
        <hr />
        {todos?.map((element) => {
          return (
            <>
              <ul className="flex" key={element.id}>
                <li className="flex-1">{element.title}</li>
                <li className="flex-1">{element.todo}</li>
                <li className="flex-1">
                  <div className="flex">
                    <form action={deleteTodo}>
                      <input
                        type="hidden"
                        name="id"
                        value={JSON.stringify(element.id)}
                      />
                      <button
                        className="p-2 m-2 bg-red-600 text-white hover:cursor-pointer "
                        type="submit"
                      >
                        Delete
                      </button>
                    </form>
                    <Link href={"/edit/" + element._id}>
                      <button className="p-2 m-2 bg-blue-600 text-white hover:cursor-pointer">
                        Edit
                      </button>
                    </Link>
                  </div>
                </li>
              </ul>
            </>
          );
        })}
      </div>
    </main>
  );
}
