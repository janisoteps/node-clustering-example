const cluster = require('cluster');
const os = require('os');
const express = require('express');
const {randomArrayReduce} = require("./array");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master is running with process ID: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} crashed. Spawning a new one.`);
    cluster.fork();
  });
} else {
  const app = express();

  app.get('/thread-worker', (req, res) => {
    const arraySum = randomArrayReduce();
    console.log(arraySum);

    res.json({
      pid: process.pid,
      arraySum
    });
  })

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} is now connected to port 3000`);
  });
}
