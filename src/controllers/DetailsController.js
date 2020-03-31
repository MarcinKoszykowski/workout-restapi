import Details from '../models/Details';

const details = {
  add: async (req, res) => {
    const { userId, data } = req.body;

    Details.find({ userId })
      .then((results) => {
        if (results.length) {
          Details.findOneAndUpdate(
            { userId },
            data,
            { new: true, useFindAndModify: false },
            (err) => {
              if (err) {
                res.send({ status: 2 });
              } else {
                res.send({ status: 1 });
              }
            },
          ).catch((error) => res.send({ error, status: 3 }));
        } else {
          new Details({ userId, age: data.age, height: data.height, weight: data.weight })
            .save()
            .then((detailsResults) => {
              if (detailsResults) {
                res.send({ status: 1 });
              } else {
                res.send({ status: 2 });
              }
            })
            .catch((error) => res.send({ error, status: 3 }));
        }
      })
      .catch((error) => res.send({ error, status: 3 }));
  },
  getByUserId: (req, res) => {
    const { userId } = req.body;

    Details.find({ userId })
      .then((results) => {
        if (results.length) {
          res.send({ status: 1, details: results[0] });
        }
      })
      .catch((error) => res.send({ error, status: 3 }));
  },
};

export default details;
