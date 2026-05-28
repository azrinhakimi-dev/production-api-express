import logger from '#config/logger';

const CLIENT_ERRORS = {
    'Email already registered': 409,
    'User not found': 404,
    'Invalid credentials': 401,
    'Token expired, please login again': 401,
    'Invalid token, please login again': 401,
    'Failed to verify token': 401,
};

export const errorHandler = (err, req, res, _next) => {
    const message = err?.message || 'Internal server error';
    const path = req?.path || 'unknown';
    const method = req?.method || 'unknown';

    if (message in CLIENT_ERRORS) {
        logger.warn(message, { path, method });
        return res.status(CLIENT_ERRORS[message]).json({ error: message });
    }

    logger.error(message, { path, method, stack: err?.stack });

    res.status(500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : message,
    });
};