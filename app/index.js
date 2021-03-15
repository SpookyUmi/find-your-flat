const express = require('express');
const router = require('./router');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running, listening on port ${PORT}`);
});
