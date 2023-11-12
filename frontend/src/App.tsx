import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "./constants/constants";

type ITodo = {
  id: string;
  title: string;
  description: string;
  isUpdated: boolean;
  isChanged: boolean;
};
const initialFormData = {
  title: "",
  description: "",
};
const App = () => {
  const [createTodo, setCreateTodo] = useState(false);
  const [form, setForm] = useState(initialFormData);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);
  const { title, description } = form;

  useEffect(() => {
    getAllTodos();
  }, [todos]);

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.status) {
      toast.success(data.message);
      setCreateTodo(false);
      setForm(initialFormData);
    }
  };

  const getAllTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL);
      const data = await res.json();
      if (data.status) {
        setLoading(false);
        setTodos(data.todos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-slate-300 shadow-md  gap-5 rounded-xl flex flex-col items-center w-3/4">
        <h3 className="text-xl text-white uppercase font-bold rounded-xl bg-sky-300 w-full flex justify-center items-center h-14">
          All todos
        </h3>
        <button
          onClick={() => setCreateTodo(!createTodo)}
          className="border border-sky-400 border-dashed text-slate-600 text-lg px-7 rounded-md p-1"
        >
          Create Todo
        </button>
        <div className="w-full mb-5 flex flex-col gap-2">
          {todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className="bg-sky-300 flex gap-2 items-center text-white w-[96%] mx-auto rounded-md px-2 text-lg cursor-pointer"
              >
                <input type="radio" />
                <h2>{todo.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
      {createTodo ? (
        <form
          onSubmit={handleForm}
          className="z-10 w-3/4 absolute top-1/4 flex flex-col justify-center gap-5 p-5 bg-sky-300 rounded-md"
        >
          <button
            onClick={() => setCreateTodo(false)}
            className="absolute right-3 top-1 text-3xl text-neutral-700 hover:text-red-500 transition-all"
          >
            x
          </button>
          <section className="flex flex-col gap-2">
            <label className="text-neutral-700" htmlFor="title">
              Title
            </label>
            <input
              name="title"
              value={title}
              onChange={onFormChange}
              className="border p-2 rounded-md"
              type="text"
              placeholder="Eg:Wash dishes"
            />
            <span className="text-red-700">Title is required</span>
          </section>
          <section className="flex flex-col gap-2">
            <label className="text-neutral-700" htmlFor="description">
              Description
            </label>
            <input
              name="description"
              value={description}
              onChange={onFormChange}
              className="border p-2 rounded-md"
              type="text"
              placeholder="Eg:Wash it before 12"
            />
            <span className="text-red-700">Description is required</span>
          </section>
          <button
            type="submit"
            className="rounded-md bg-teal-500 text-white p-2 px-5 hover:bg-teal-300 "
          >
            Create
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default App;
