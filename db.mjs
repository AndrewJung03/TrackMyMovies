import mongoose from 'mongoose';

//users
//site requires authentication
//users have a username and password
//They also have a list of movies that they've watched
const user = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    moviesWatched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});


//A movie
//includes which user posted, title, picture, review, notes, release date, and added date
const movie = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    picture: { type: String },
    review: { type: Number, min: 1, max: 5 },
    note: { type: String },
    release: { type: String, required: true },
    addedOn: { type: String, required: true }
});

