import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionMiddleware = session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,

    // for persistent session store, use connect-mongo and provide below store property
    // if we don't use this, session will be stored in memory and will be lost on server restart
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017',
        collectionName: 'sessions',
        ttl: 24 * 60 * 60
    }),

    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
});

export default sessionMiddleware;
