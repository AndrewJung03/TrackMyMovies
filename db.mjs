import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
//users
//site requires authentication
//users have a username and password
//They also have a list of movies that they've watched
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    moviesWatched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

//A movie
//includes which user posted, title, picture, review, notes, release date, and added date
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String },
    review: { type: Number, min: 1, max: 5 },
    note: { type: String },
    release: { type: String, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

export {User, Movie};

const mongoURI = 'mongodb://localhost:27017/moviedb';

mongoose.connect(process.env.DSN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



export default mongoose;
