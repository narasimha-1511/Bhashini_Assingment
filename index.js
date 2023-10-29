const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

// when '/' is called it must hit th public folder
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
app.use(express.json());
app.use('/scaler/translate',require("./routes/route.js"));

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})