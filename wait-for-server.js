/* eslint-disable no-console */
const http = require("http");

const isVerbose = process.argv.includes("--verbose");

const options = {
  hostname: "172.17.0.1",
  port: 3000,
  path: "/",
  timeout: 2000,
};

function waitForServer() {
  const req = http.request(options, (res) => {
    if (isVerbose) {
      console.log(`Received response: ${res.statusCode}`);
    }

    if (res.statusCode === 200) {
      console.log("Server is ready");
      process.exit(0);
    } else {
      if (isVerbose) {
        console.log(`Server not ready, received status: ${res.statusCode}. Retrying...`);
      }
      setTimeout(waitForServer, 1000);
    }
  });

  req.on("error", (err) => {
    if (isVerbose) {
      console.log(`Request error: ${err.message}. Retrying...`);
    } else {
      console.log("Waiting for server...");
    }
    setTimeout(waitForServer, 1000);
  });

  req.end();
}

if (isVerbose) {
  console.log(`Waiting for server at http://${options.hostname}:${options.port}`);
}

waitForServer();
