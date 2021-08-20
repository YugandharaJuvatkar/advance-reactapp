import { addNewTask, updateTask } from "./server";

async function myFunc() {
  addNewTask({
    name: "MY Task",
    id: "12345",
  });
  updateTask({
    id: "12345",
    name: "my task --updated",
  });
}

myFunc();
