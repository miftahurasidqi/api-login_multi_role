const SequelizeStore = require("connect-session-sequelize");
const session = require("express-session");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRoute = require("./routes/auth");
const db = require("./config/db.config");
const { Sequelize } = require("sequelize");
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(cors());

// app.use(
//   cors({
//     credentials: true,
//     // origin: "http://localhost:3000",
//   })
// );
app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(authRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => console.log(`server runing on port....`));
