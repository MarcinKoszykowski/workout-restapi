import express from 'express';
import jwt from 'jsonwebtoken';
import user from '../controllers/UserController';
import details from '../controllers/DetailsController';

const app = express();
const router = express.Router();

router.post('/user/register', user.register);
router.post('/user/login', user.login);
router.post('/user/get/id', user.getById);

router.post('/details/add', details.add);
router.post('/details/get/userId', details.getByUserId);

router.use((req, res, next) => {
  const token = req.headers['Access-Token'];

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

export default router;
