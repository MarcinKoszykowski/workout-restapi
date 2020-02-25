import express from 'express';
import jsw from 'jsonwebtoken';
import user from '../controllers/UserControllers';

const router = express.Router();

router.post('/user/register', user.register);
router.post('/user/login', user.login);

router.use((req, res, next) => {
  let token = req.headers['Access-Token'];

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
