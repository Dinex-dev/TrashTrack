
require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors')


// const uri = 'mongodb://garbage:garbage@localhost';
const uri="mongodb+srv://garbage:garbage@cluster0.j5w7spo.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri,{ useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1})
const Insert = require('./Insert')
const app = express();
const port = process.env.PORT || 5000;
const dbName = process.env.DB_NAME || 'test';



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.post('/api/InsertLocation', async (req, res) => {
    const {
        lat,
        lng
    } = req.body
    
    if (!lat || !lng) {
        return res.status(400).json({ msg: 'Something missing' })
    }
    const data = {
        lat,
        lng
    }
    const response = await Insert(client, dbName, 'garbageLocation', data)
    response === 'Success' ? res.status(200).json({ msg: 'Location inserted Succesfully' }) : res.status(400).json({ msg: 'Something went wrong' })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})