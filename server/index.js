require("dotenv").config();
// REQUIRE DEPENDENCIES
const { json } = require("body-parser");
// const cors = require("cors");
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const uc = require("./controllers/userController");

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

// MAKE PORT AND APP
const app = express();
const PORT = process.env.PORT || 3005;

// USING BODY PARSER AND CORS
app.use(json());
// app.use(cors());

// SETTING UP DATABASE CONNECTION
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

// SETTING UP SESSION
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 525600 * 60 * 1000
    }
  })
);

app.post("/api/auth", uc.getUser);
app.post("/api/create", uc.createUser);
app.get("/api/medicine/:id", uc.getMedicine);
app.post("/api/createmedicine", uc.createMedicine);
app.get("/api/edit/:id", uc.editMedicine);
app.delete("/api/deletemedicine", uc.deleteMedicine);
app.post("/api/colors", uc.addColors);
app.get("/api/colors/:id", uc.getColors);
app.post("/api/colors/update", uc.updateColors);
app.post("/api/alarm/add", uc.addAlarm);
app.post("/api/alarm/get", uc.getAlarm);
app.post("/api/alarm/delete", uc.deleteAlarm);
app.post("/api/active/medicine/create", uc.createActiveMedicine);
app.post("/api/colors/delete", uc.deleteColors);
app.post("/api/user/get", uc.getUserById);
app.post("/api/alarms/delete", uc.deleteAllAlarms);

// APP LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
