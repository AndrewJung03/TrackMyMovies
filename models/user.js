import mongoose from 'mongoose';

const user = new mongoose.Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },
  moviesWatched: {type: Array}
});

export const User = mongoose.model('User', user);
