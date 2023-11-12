import './style.css'

interface Todo{
  title:string,
  isCompleted:boolean,
  readonly id:string
}

const todos:Array<string> = []



const todoInput = document.getElementsByName("title")[0] as HTMLFormElement;

const myForm = document.getElementById("myform") as HTMLFormElement;

myForm.onsubmit = (e:SubmitEvent) => {
  e.preventDefault();

  const todo:Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random()*1000),
  };

  todos.push(todo);
  console.log(todos);
}