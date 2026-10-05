const http = require("node:http");

const tasks = [
  { id: 1, title: "Learn React", completed: true },
  { id: 2, title: "Learn Node.js", completed: false },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/tasks") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    // TODO: Convert tasks to JSON text and send it
    // using res.end(...).

    return;
  }

  res.writeHead(404, {
    "Content-Type": "text/plain",
  });
  res.end("Not found");
});

server.listen(3001, "127.0.0.1", () => {
  console.log("Open http://127.0.0.1:3001/tasks");
});