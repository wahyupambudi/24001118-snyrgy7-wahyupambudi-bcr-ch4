const http = require("http");
const fs = require("fs");
const path = require("path");

// membuat fungsi server
const server = http.createServer((req, res) => {
  //   mendapatkan filepath dari url
  let filePath = "./public" + req.url;

  //   routing
  if (filePath === "./public/") {
    filePath = "./public/index.html"; // Redirect to index.html
  } else if (filePath === "./public/rental") {
    filePath = "./public/rental-car.html";
  }

  //   mendapatkan extensi dari file yang didapatkan pada filepath url
  //   untuk kebutuhan mime
  const extname = path.extname(filePath);
  let contentType = "text/html";
  if (extname === ".css") {
    contentType = "text/css";
  } else if (extname === ".js") {
    contentType = "text/javascript";
  }

  //   proses membaca file dari filepath dan pengkondisian jika 404, dan 500
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found
        res.writeHead(404);
        res.end("File not found");
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
