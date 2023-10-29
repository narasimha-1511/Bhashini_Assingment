const express = require('express');
const app = express();
const port = 3000;

app.use('/',express.static('public'));
app.use(express.json());
app.use('/scaler/translate',require("./routes/route.js"));

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})