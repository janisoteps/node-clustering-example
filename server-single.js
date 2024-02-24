const express = require('express');
const {randomArrayReduce} = require("./array");

const app = express();

app.get('/thread-single', (req, res) => {
  try {
    const arraySum = randomArrayReduce();
    console.log(arraySum);

    res.json({
      pid: process.pid,
      arraySum
    });
  } catch (e) {
    console.log(e);

    res.json({
      pid: process.pid,
      error: e
    });
  }
})

app.listen(3000, () => {
  console.log(`Master ${process.pid} is now connected to port 3000`);
});
