const SequelizeStore = require("connect-session-sequelize");
const session = require("express-session");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRoute = require("./routes/auth");
const tes = require("./routes/tes");

const db = require("./config/db.config");
const { Sequelize } = require("sequelize");

const port = process.env.APP_PORT || 3211;

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
const router = express.Router();

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(authRoute);
app.use(
  router.get("/tes", async (req, res) => {
    res.status(200).json({ metadata: "test get data endpoint" });
  })
);

// store.sync();

app.listen(port, () => console.log(`server runing on port ${port}`));
