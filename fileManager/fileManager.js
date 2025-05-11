const fs = require("fs");
const filePath = "./tasks.json";


if(command===add){
  addTask(argument);
}else if(command===list){
  listTask();
}else if(command===remove){
  removeTask(parseInt(argument));
}else{
  console.log("Command not found!");
}