const { json } = require("express");
const fs = require("fs")


const getTodosSync = () => {
  return fs.readFileSync("db.txt","utf-8")
};

const getTodoSync = (id) => {
  const data = fs.readFileSync("db.txt","utf-8").split("\n")
  for (let i = 0; i<data.length; i++){
    const res = JSON.parse(data[i])
    if (res.id === id){
      return JSON.stringify(res)
      
    }

  }
};

const createTodoSync = (todo) => {
  const todoData = {
    id: Date.now(),
    title: todo,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const data = `${JSON.stringify(todoData)}`
  fs.writeFileSync("db.txt", `${data}\n`, { flag: 'a' });
};

const updateTodoSync = (id, updates) => {
  const existingBef = fs.readFileSync("db.txt","utf-8")
  const existing = fs.readFileSync("db.txt","utf-8").split("\n")
  
  for (let i = 0; i<existing.length; i++){
    const res = JSON.parse(existing[i])
    if (res.id == id){
      let updatedTodo = JSON.stringify({...res,...updates,updatedAt: new Date().toISOString()})
      const replaced = existingBef.replace(existing[i],updatedTodo)
      fs.writeFileSync("db.txt",replaced)
    }

  }
};

const deleteTodoSync = (id) => {
  const existingBef = fs.readFileSync("db.txt","utf-8")
  const existing = fs.readFileSync("db.txt","utf-8").split("\n")
  
  for (let i = 0; i<existing.length; i++){
    const res = JSON.parse(existing[i])
    if (res.id == id){
      const replaced = existingBef.replace(existing[i],"")
      fs.writeFileSync("db.txt",replaced)
    }

  }
};


module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};


