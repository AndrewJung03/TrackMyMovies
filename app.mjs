import express from 'express';
import session from 'express-session';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Movie } from './db.mjs';
import * as auth from './auth.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer Setup for File Uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Middleware Setup
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadDir));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Auth Middleware
const authRequired = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Home
app.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

// Registration Messages
const registrationMessages = {
  'USERNAME ALREADY EXISTS': 'Username already exists',
  'USERNAME PASSWORD TOO SHORT': 'Username or password is too short',
};

// Registration Routes
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await auth.register(username, password);
    await auth.startAuthenticatedSession(req, user);
    res.redirect('/my-movies');
  } catch (err) {
    console.error('Registration Error:', err);
    const message = registrationMessages[err.message] ?? 'Registration error';
    res.render('register', { message });
  }
});

// Login Messages
const loginMessages = {
  'USER NOT FOUND': "User doesn't exist",
  'PASSWORDS DO NOT MATCH': 'Incorrect password',
};

// Login Routes
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await auth.login(username, password);
    await auth.startAuthenticatedSession(req, user);
    res.redirect('/my-movies');
  } catch (err) {
    console.error('Login Error:', err);
    const message = loginMessages[err.message] ?? 'Login unsuccessful';
    res.render('login', { message });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Add Movie
app.get('/add-movie', authRequired, (req, res) => {
  res.render('add-movie', { title: 'Add a Movie' });
});

app.post('/add-movie', authRequired, upload.single('picture'), async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title,
      url: req.file ? `/uploads/${req.file.filename}` : null,
      review: req.body.review,
      note: req.body.note,
      release: req.body.release,
      user: req.session.user._id,
    });
    await movie.save();
    res.redirect('/my-movies');
  } catch (err) {
    console.error('Add Movie Error:', err);
    res.render('add-movie', {
      message: 'Failed to add movie. Please try again.',
    });
  }
});

// View Movies
app.get('/my-movies', authRequired, async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const filter = { user: req.session.user._id };
    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search
    }
    const movies = await Movie.find(filter);
    res.render('my-movies', { title: 'My Movies', movies });
  } catch (error) {
    console.error('Load Movies Error:', error);
    res.status(500).send('Failed to load movies.');
  }
});

// Edit Movie
app.get('/edit-movie/:id', authRequired, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.render('edit-movie', { movie, title: 'Edit Movie' });
  } catch (error) {
    console.error('Edit Movie Error:', error);
    res.status(500).send('Failed to load movie for editing.');
  }
});

app.post('/edit-movie/:id', authRequired, upload.single('picture'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      release: req.body.release,
      review: parseInt(req.body.review, 10),
      note: req.body.note,
    };

    if (req.file) {
      updateData.url = `/uploads/${req.file.filename}`;
    }

    await Movie.findByIdAndUpdate(req.params.id, updateData, { runValidators: true });
    res.redirect('/my-movies');
  } catch (error) {
    console.error('Update Movie Error:', error);
    res.status(500).send('Failed to update movie. Please try again.');
  }
});

// Delete Movie
app.post('/delete-movie/:id', authRequired, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/my-movies');
  } catch (error) {
    console.error('Delete Movie Error:', error);
    res.status(500).send('Failed to delete movie. Please try again.');
  }
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log('Server is running on port', process.env.PORT ?? 3000);
});
