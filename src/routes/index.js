import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import user from '../controllers/UserController';
import details from '../controllers/DetailsController';
import training from '../controllers/TrainingController';

const app = express();
const router = express.Router();

dotenv.config();

app.set('Secret', process.env.SECRET);

router.post('/user/register', user.register);
router.post('/user/login', user.login);

router.use((req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    jwt.verify(token, app.get('Secret'), (error, decoded) => {
      if (error) {
        res.send({ status: 99 });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({ status: 50 });
  }
});

router.post('/user/get/id', user.getById);
router.post('/details/add', details.add);
router.post('/details/get/userId', details.getByUserId);
router.post('/training/add', training.add);

export default router;
