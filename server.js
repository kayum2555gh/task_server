const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
// const { router } = require('./routes/testRoutes');
const connectDB = require('./config/db');

// rest object
const app = express();



// middlewares
dotenv.config();

// db connection
connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


// routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/user", require('./routes/userRoutes'));
app.use("/api/v1/todo", require('./routes/todoRoutes'))
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});



// port
const port = process.env.PORT || 3030;

// listen
app.listen(port, () => {
    console.log(`Server is running on the port no ${port}`);
})