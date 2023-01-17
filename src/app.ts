import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import AuthRoutes from './routes/auth.routes'
import PrivateRoutes from './routes/private.routes'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
// initializations
const app = express();


// settigns
app.set('port', process.env.PORT || 3000);

// miidlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
// routes
app.use(AuthRoutes);
app.use(PrivateRoutes);


app.get('/', (req, res) => {
    res.send(`API is at http://localhost:${app.get('port')}`)
});

export default app;
