import User from '../models/User';

const user = {
  register: async (req, res) => {
    const newUserContent = {
      email: req.body.email,
      password: req.body.password,
    };

    User.find({ email: newUserContent.email })
      .then(results => {
        if (results.length) {
          res.send({ status: 2 });
        } else {
          new User(newUserContent)
            .save()
            .then(results => res.send({ status: 1, results }))
            .catch(error => res.send({ error, status: 3 }));
        }
      })
      .catch(error => res.send({ error, status: 3 }));
  },
  login: (req, res) => {
    const userContent = {
      email: req.body.email,
      password: req.body.password,
    };

    User.find({ email: userContent.email })
      .then(results => {
        if (!results.length) {
          res.send({ status: 2 });
        } else {
          let userPassword = results[0].password;

          if (userPassword === userContent.password) {
            res.send({ status: 1, user: results[0] });
          } else {
            res.send({ status: 3 });
          }
        }
      })
      .catch(error => res.send({ error, status: 4 }));
  },
  id: (req, res) => {
    const id = req.body.id;

    User.find({ _id: id })
      .then(results => {
        if (!results.length) {
          res.send({ status: 2 });
        } else {
          res.send({ status: 1, user: results[0] });
        }
      })
      .catch(error => res.send({ error, status: 4 }));
  },
  update: (req, res) => {
    const update = req.body.update;
    const id = req.body.id;

    User.findByIdAndUpdate(id, update)
      .then(res.send({ status: 1 }))
      .catch(error => res.send({ error, status: 2 }));
  },
};

export default user;
