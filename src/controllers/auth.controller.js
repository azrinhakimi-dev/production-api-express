import {authenticateUser, createUser} from '#services/auth.service';
import { jwtToken } from '#utils/jwt';
import { cookies } from '#utils/cookie';
import logger from "#config/logger";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await createUser({ name, email, password, role });

    const token = jwtToken.sign({
      email: user.email,
      name: user.name,
      role: user.role,
    });

    cookies.set(res, 'token', token);
    logger.info('Sign up successfully.');

    res.status(201).json({
      message: 'Signup successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser({ email, password });
        const token = jwtToken.sign({
            email: user.email,
            name: user.name,
            role: user.role,
        });

        cookies.set(res, 'token', token);
        logger.info('Sign in successfully.');

        res.status(200).send({
            message: 'Sign in successfully.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }catch (err) {
        next(err);
    }
}
