const router = require("express").Router();
let todos = [];

router.get("/todos", (req, res, next) => {
  res.status(200).json({
    message: "Fetched all todos successfully",
    data: todos,
  });
});
router.post("/todos", (req, res, next) => {
  const newTodo = {
    id: new Date().getTime(),
    description: req.body.description,
  };
  todos.push(newTodo);
  res.status(201).json({
    message: "Created a new todo successfuly",
    data: newTodo,
  });
});
router.put("/todos/:todoId", (req, res, next) => {
  const id = req.params.todoId;
  const index = todos.findIndex((t) => t.id == id);
  if(+index >= 0 ){
      todos = [...todos, { id, description: req.body.description }];
      res.status(200).json({
        message: "Updated the tod successfully",
        data: {
          todo: { id, description: req.body.description },
          todos,
        },
      });
  }else{
    res.status(200).json({
        message: "No todo with given Id found",
    }) 
  }
});
router.delete("/todos/:todoId", (req, res, next) => {
  const id = req.params.todoId;
  const todoIndex = todos.findIndex((t) => t.id == id);
  todos.splice(todoIndex, 1);

  res.status(200).json({
      message: "Deletion was a success",
      data: todos
  })
});

module.exports = router;
