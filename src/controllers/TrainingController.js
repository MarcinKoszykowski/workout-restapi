import Training from '../models/Training';

const training = {
  add: (req, res) => {
    const data = req.body.training;

    new Training(data)
      .save()
      .then((results) => {
        if (results) {
          res.send({ status: 1, training: results });
        } else {
          res.send({ status: 2 });
        }
      })
      .catch((error) => res.send({ error, status: 3 }));
  },
  getByUserId: (req, res) => {
    const {userId} = req.body;

    Training.find({ userId })
      .then((results) => {
        if (results) {
          res.send({ status: 1, userTraining: results });
        } else {
          res.send({ status: 2 });
        }
      })
      .catch((error) => res.send({ error, status: 3 }));
  },
  delete: (req, res) => {
    const {id} = req.body;

    Training.findByIdAndDelete(id)
      .then((results) => {
        if (results) {
          res.send({ status: 1 });
        } else {
          res.send({ status: 2 });
        }
      })
      .catch((error) => res.send({ error, status: 3 }));
  },
};

export default training;
