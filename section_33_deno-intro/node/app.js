const app = require("express")();
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todos");

app.use(bodyParser.json());

app.use(todoRoutes);

app.listen(3000);
