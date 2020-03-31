import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const app = express();
dotenv.config();

app.set('Secret', process.env.SECRET);

const user = {
  register: async (req, res) => {
    const newUserContent = {
      email: req.body.email,
      password: req.body.password,
    };

    User.find({ email: newUserContent.email })
      .then((results) => {
        if (results.length) {
          res.send({ status: 2 });
        } else {
          new User(newUserContent)
            .save()
            .then((userResults) => res.send({ status: 1, userResults }))
            .catch((error) => res.send({ error, status: 3 }));
        }
      })
      .catch((error) => res.send({ error, status: 3 }));
  },
  login: (req, res) => {
    const userContent = {
      email: req.body.email,
      password: req.body.password,
    };

    User.find({ email: userContent.email })
      .then((results) => {
        if (!results.length) {
          res.send({ status: 2 });
        } else {
          const userPassword = results[0].password;

          if (userPassword === userContent.password) {
            const token = jwt.sign({ check: true }, app.get('Secret'), { expiresIn: '168h' });
            res.send({ status: 1, user: results[0], token });
          } else {
            res.send({ status: 3 });
          }
        }
      })
      .catch((error) => res.send({ error, status: 4 }));
  },
  getById: (req, res) => {
    const { id } = req.body;

    User.find({ _id: id })
      .then((results) => {
        if (!results.length) {
          res.send({ status: 2 });
        } else {
          res.send({ status: 1, user: results[0] });
        }
      })
      .catch((error) => res.send({ error, status: 4 }));
  },
};

export default user;
