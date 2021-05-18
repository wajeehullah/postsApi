const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const morgan = require('morgan'); // npm install --save morgan
// npm install
connectDb();
const app = express();
const usersRouter = require('./routers/usersRouter');
const postsRouter = require('./routers/postsRouter');
const authRouter = require('./routers/authRouter');
const errorHandler = require('./middlewares/error');
const port = 30001;
// Body parser
app.use(express.json());
app.use(cors());
app.use(morgan()); // added for logging requests to console 
// configure routers
app.use('/user', usersRouter);
app.use('/posts', postsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res, next) => { res.send('default route'); })

app.use(errorHandler);

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})