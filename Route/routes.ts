import express from 'express';
import { CreateUser, LoginUser, RegisterOrganization, UpdateUser, verify_session } from '../APIs/AuthenticationAPI';
import { verify_token } from '../Middlewares/Authentication';
import { AddPermissionComponent } from '../APIs/PermissionComponentAPI';

const router = express.Router();

// Authentication Routes
router.post('/register-organization', RegisterOrganization);
router.post('/create-user', CreateUser);
router.post('/login', LoginUser);
router.post('/verify-session', [verify_token] ,verify_session);
router.post('/update',  [verify_token],UpdateUser);

//Permission component routes
router.post('/add-permission-component',[verify_token] ,AddPermissionComponent);


export default router;