const tasks = [
  { text: "Learn JavaScript basics", done: false },
  { text: "Review Array.map()", done: true },
  { text: "Build a simple Todo App", done: false },
  { text: "Drink coffee ☕", done: true },
];

console.clear();
console.log(tasks);
console.log("---------------map-----------------");

tasks.map((task) => {
  console.log(task);
});

console.log("--------------------------------");
// const htmlStr = tasks
//   .map((task) => {
//     return `<li>${task.text}</li>`;
//   })
// //   .join("");
// console.log(htmlStr);


function app() {
  console.clear();
  htmlStr = tasks
    .map(task =>
      `<li>${task.text}</li>`
    )
    .join("\n");
  console.log(htmlStr);

  document.querySelector("#task-list").innerHTML = htmlStr;
}

app()