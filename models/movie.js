import mongoose from "mongoose";

const movie = new mongoose.Schema({
    title: {type: String, required: true},
    releaseDate: {type: String, required: true},
    rating: {type: String, required: true},
    note: {type:String},
    Director: {type:String, required: true},
    poster: {type: String, required:true}
});

export const Movie = mongoose.model("Movie", movie);