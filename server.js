require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./index");
const DB = process.env.DATABASE_URI;
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("db connected successful!");
  });
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
