const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');
const path=require('path');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

// app.get('/ping', (req, res) => {
//     res.send('PONG');
// });

const _dirname=path.resolve();

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)


app.use(express.static(path.join(_dirname,
    "/frontend/build"
)));

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend", "build", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})