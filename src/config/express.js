import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Settings
app.use(cors());
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, '..', 'views'));

// Configure Handlebars
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use(await import('../routes/index.js').then(m => m.default));
app.use(await import('../routes/api.js').then(m => m.default));

export default app;
