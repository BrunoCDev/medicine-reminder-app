const getUser = (req, res, next) => {
  const { email, password } = req.body;
  const db = req.app.get("db");
  db
    .getUser([email, password])
    .then(response => res.json(response[0]))
    .catch(console.log);
};

const createUser = (req, res, next) => {
  const db = req.app.get("db");
  const { email, password } = req.body;
  db
    .createUser([email, password])
    .then(response => res.json(response[0]))
    .catch(console.log);
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
    .then(response => res.json(response))
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
      id
    ])
    .then(response => res.json(response))
    .catch(console.log);
};

const addAlarm = (req, res, next) => {
  const db = req.app.get("db");
  const { medicineId, id, interval, final } = req.body;
  db
    .addAlarm([medicineId, id, interval, final])
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
  createActiveMedicine
};
