const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/courseRoutes');

const app = express();
// create an app variable that stores results of the express function that initialize our express application and allow to access different methods that will make backend application easy

mongoose.connect('mongodb+srv://MiguelC:Elpsykongroo@sandbox.al4elz5.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server Running on Localhost: ${process.env.PORT || 4000}`)
});