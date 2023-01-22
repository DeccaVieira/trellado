import express from 'express';

const server = express();


server.listen(4000, () => {
  console.log("Server running in port 4000.")
})