import bcrypt from 'bcrypt';
import { User } from './db.mjs';

export async function register(username, password) {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('USERNAME ALREADY EXISTS');
  }
  if (username.length < 3 || password.length < 6) {
    throw new Error('USERNAME PASSWORD TOO SHORT');
  }
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, hash });
  await user.save();
  return user;
}
export async function login(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('USER NOT FOUND');
  }
  const isValid = await bcrypt.compare(password, user.hash);
  if (!isValid) {
    throw new Error('PASSWORDS DO NOT MATCH');
  }
  return user;
}
export function startAuthenticatedSession(req, user) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) {
        return reject(err);
      }
      req.session.user = {
        _id: user._id,
        username: user.username,
      };
      resolve();
    });
  });
}
