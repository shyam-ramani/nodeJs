import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const todo = [];
const prompt = () => {
  console.log("Todo List Application");
  console.log("1. Add a new todo item");
  console.log("2. View all todo items");
  console.log("3. Exit");
  rl.question("Choose an option (1, 2, or 3): ", show);
}
const show = (options) => {


  if (options === "1") {
    rl.question("Enter the todo item: ", (newTodo) => {
      todo.push(newTodo);
      console.log(`Todo item "${newTodo}" added successfully.`);
      show();
    });
  }
  else if (options === "2") {
    console.log("View all todo items");
    todo.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
    prompt();

  }
  else if (options === "3") {
    console.log("goodbye");
    rl.close();

  }
  else {
    console.log("Invalid option selected");
    console.log("Please select a valid option from the menu.");
    prompt();
  }
}
prompt();