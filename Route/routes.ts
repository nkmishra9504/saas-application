import express from 'express';
import { AllUsers, CreateUser, LoginUser, RegisterOrganization, UpdateUser, verify_session } from '../APIs/AuthenticationAPI';
import { verify_token } from '../Middlewares/Authentication';
import { AddPermissionComponent } from '../APIs/PermissionComponentAPI';

const router = express.Router();

// Authentication Routes
router.post('/register-organization', RegisterOrganization);
router.post('/create-user', [verify_token] , CreateUser);
router.post('/login',  LoginUser);
router.post('/update-user',  [verify_token],UpdateUser);
router.post('/all-users',  [verify_token], AllUsers);
router.post('/verify-session', [verify_token] ,verify_session);

//Permission component routes
router.post('/add-permission-component',[verify_token] ,AddPermissionComponent);


export default router;