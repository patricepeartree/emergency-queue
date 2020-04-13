import { Router, Request, Response } from 'express';

const router = Router();

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/', (req: Request, res: Response) => {
  res.send('Test successful');
})

export default router;
