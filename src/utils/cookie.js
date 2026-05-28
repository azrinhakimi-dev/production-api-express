export const cookies = {
  options: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  }),
  set: (res, name, value, options) => {
    (res.cookie(name, value), { ...cookies.options(), ...options });
  },
  get: (req, name) => {
    return req.cookies[name];
  },
};
