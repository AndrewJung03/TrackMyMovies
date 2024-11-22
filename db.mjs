import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
  });

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String },
    review: { type: Number, min: 1, max: 5 },
    note: { type: String },
    release: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  
const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

export { User, Movie };

const mongoURI = process.env.DSN ?? 'mongodb://localhost:27017/moviedb';

mongoose.connect(mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

export default mongoose;
