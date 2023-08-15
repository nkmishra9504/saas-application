import express from 'express';
import { LoginUser, RegisterOrganization, UpdateUser } from '../APIs/AuthenticationAPI';
import { verify_token } from '../Middlewares/Authentication';

const router = express.Router();

router.post('/register-organization', RegisterOrganization);
router.post('/login', LoginUser);
router.post('/update',  [verify_token],UpdateUser);

export default router;