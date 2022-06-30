import { v4 as uuidV4 } from "uuid"

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

//html elements to get data from or add too
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

//array of elements variable
const tasks: Task[] = loadTasks()

//load list of tasks available
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

//saving to local storage
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

//to check for tasks if available and load them if soo; 
//converts the locale JSON to string
function loadTasks(): Task[] {

  //getting ittem from locall storage and pasring json
  const taskJSON = localStorage.getItem("TASKS")

  //JSON parse only allows string; creatte if statementt for anything null and blank array
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}
