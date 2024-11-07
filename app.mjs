// Ensure that you've correctly imported mongoose and connected to your MongoDB database in db.mjs
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Movie, User } from './db.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: "Register" });
});

app.get('/login', (req, res) => {
  res.render('login', { title: "Login" });
});

app.get('/add-movie', (req, res) => {
  res.render('add-movie', { title: 'Add a Movie' });
});

app.post('/add-movie', async (req, res) => {
  try {
    const movie = new Movie({
      title: (req.body.title),
      url: (req.body.url),
      review: (req.body.review),
      note: (req.body.note),
      release: (req.body.release)
    });
    await movie.save();
    res.redirect('/my-movies');
  } catch (err) {
    res.render('add-movie', { message: 'Failed to add movie. Please try again.' });
  }
});

app.get('/my-movies', async (req, res) => { 
  try {
    const movies = await Movie.find({});
    res.render("my-movies", { title: "My Movies", movies });
  } catch (error) {
    res.status(500).send("Failed to load movies.");
  }
});

app.post('/delete-movie/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/my-movies');
  } catch (error) {
    res.status(500).send("Failed to delete movie. Please try again.");
  }
});

app.get('/edit-movie/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.render('edit-movie', { movie, title: "Edit Movie" });
  } catch (error) {
    res.status(500).send("Failed to load movie for editing.");
  }
});


app.post('/edit-movie/:id', async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      review: parseInt(req.body.review, 10)
    });
    console.log("Movie updated successfully:", req.params.id);
    res.redirect('/my-movies');
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).send("Failed to update movie. Please try again.");
  }
});



app.listen(process.env.PORT ?? 3000, () => {
  console.log('Server is running...');
});
