import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

app.get('/register', (req, res) => {
  res.render('register',{title: "Register"});
});

app.get('/login', (req, res) => {
  res.render('login',{title: "Login"});
});

app.listen(process.env.PORT || 3000);
