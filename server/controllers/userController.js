const bcrypt = require("bcryptjs");

const getUser = (req, res, next) => {
  const { email, password } = req.body;
  const db = req.app.get("db");
  db
    .getUser(email)
    .then(response => {
      bcrypt.compare(password, response[0].password, function(err, confirm) {
        if (confirm == true) {
          res.json(response[0]);
        } else {
          return null;
        }
      });
    })
    .catch(console.log);
};

const createUser = (req, res, next) => {
  const db = req.app.get("db");
  const { email, password } = req.body;
  bcrypt.hash(password, parseInt(process.env.SALT, 10), function(err, hash) {
    db
      .createUser([email, hash])
      .then(response => res.json(response[0]))
      .catch(console.log);
  });
};

const getMedicine = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db
    .getMedicine([id])
    .then(response => res.json(response))
    .catch(console.log);
};

const createMedicine = (req, res, next) => {
  const db = req.app.get("db");
  const { name, image, description, rxcuis, id } = req.body;
  db
    .createMedicine([name, image, description, rxcuis, id])
    .then(response => res.json(response))
    .catch(console.log);
};

const editMedicine = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db
    .editMedicine([id])
    .then(response => res.json(response[0]))
    .catch(console.log);
};

const deleteMedicine = (req, res, next) => {
  const db = req.app.get("db");
  const { id, userId } = req.query;
  db
    .deleteMedicine([id, userId])
    .then(response => res.json(response))
    .catch(console.log);
};

const addColors = (req, res, next) => {
  const db = req.app.get("db");
  const {
    firstColor,
    secondColor,
    thirdColor,
    buttonColor,
    cardColor,
    textColor,
    footer_icon,
    id
  } = req.body;
  db
    .addColors([
      firstColor,
      secondColor,
      thirdColor,
      buttonColor,
      cardColor,
      textColor,
      footer_icon,
      id
    ])
    .then(response => res.json(response))
    .catch(console.log);
};

const getColors = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db
    .getColors([id])
    .then(response => res.json(response[0]))
    .catch(console.log);
};

const updateColors = (req, res, next) => {
  const db = req.app.get("db");
  const {
    firstColor,
    secondColor,
    thirdColor,
    buttonColor,
    cardColor,
    textColor,
    footer_icon,
    id
  } = req.body;
  db
    .updateColors([
      firstColor,
      secondColor,
      thirdColor,
      buttonColor,
      cardColor,
      textColor,
      footer_icon,
      id
    ])
    .then(response => res.json(response))
    .catch(console.log);
};

const addAlarm = (req, res, next) => {
  const db = req.app.get("db");
  const {
    medicineId,
    id,
    interval,
    final,
    displayDate,
    displayTime
  } = req.body;
  db
    .addAlarm([medicineId, id, interval, final, displayDate, displayTime])
    .then(response => res.json(response))
    .catch(console.log);
};

const getAlarm = (req, res, next) => {
  const db = req.app.get("db");
  const { medicineId, id } = req.body;
  db
    .getAlarm([medicineId, id])
    .then(response => res.json(response))
    .catch(console.log);
};

const deleteAlarm = (req, res, next) => {
  const db = req.app.get("db");
  const { medicineId, id } = req.body;
  db
    .deleteAlarm([medicineId, id])
    .then(response => res.json(response))
    .catch(console.log);
};

const createActiveMedicine = (req, res, next) => {
  const db = req.app.get("db");
  const { name, image, description, rxcuis, id } = req.body;
  db
    .createActiveMedicine([name, image, description, rxcuis, id])
    .then(response => res.json(response))
    .catch(console.log);
};

const deleteColors = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.body;
  db
    .deleteColors(id)
    .then(response => res.json(response))
    .catch(console.log);
};

const getUserById = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.body;
  db
    .getUserById(id)
    .then(response => res.json(response[0]))
    .catch(console.log);
};

const deleteAllAlarms = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.body;
  db
    .deleteAllAlarms(id)
    .then(response => res.json(response))
    .catch(console.log);
};

module.exports = {
  getUser,
  createUser,
  getMedicine,
  createMedicine,
  editMedicine,
  deleteMedicine,
  addColors,
  getColors,
  updateColors,
  addAlarm,
  getAlarm,
  deleteAlarm,
  createActiveMedicine,
  deleteColors,
  getUserById,
  deleteAllAlarms
};
