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

module.exports = {
  getUser,
  createUser,
  getMedicine,
  createMedicine,
  editMedicine,
  deleteMedicine
};
