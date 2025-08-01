import express from "express";
import router from "./src/app/routes/index.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use()



app.use("/api/v1", router);

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.get('/alive', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

app.get("*",);


export default app;