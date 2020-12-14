const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

//import the mongodb driver
const MongoClient = require('mongodb').MongoClient

//connnection string
const MONGO_URL = 'mongodb://localhost:27017'

//const MONGO_DBNAME = process.env.MONGO_DBNAME
//const MONGO_PASSWORD = process.env.MONGO_PASSWORD
//const MONGO_URL  = `mongodb+srv://Admin-yh:${MONGO_PASSWORD}@cluster0.haw1b.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`

//create a client - pool
const mongoClient = new MongoClient(MONGO_URL,
    {useNewUrlParser: true,useUnifiedTopology: true}
)

require('dotenv').config();

const PORT = parseInt(process.argv[2]) || process.env.PORT || 3000;

const app = express();

app.use(morgan('combined'));
app.use(cors());

app.get("/countries", async(req,res)=>{
    try {
        const result = await mongoClient.db('winemag')
        .collection('wine')
        .distinct('country')
        
        // result.reverse()

        res.status(200);
        res.type("application/json")
        res.json(result)
    } catch (err) {
        res.status(500);
        res.type("application/json")
        console.log(err);
    }
})

//GET /country/:country
app.get("/country/:country", async(req,res)=>{
    const country = req.params['country'];
    console.log(country);
    try {
        const result = await mongoClient.db('winemag')
        .collection('wine')
        .find({
            country:{
                $regex: country,
                $options: 'i'
            }
        }).sort({
            province:1
        })
        .limit(20)
        .project({title: 1, price: 1})
        .toArray()

        res.status(200);
        res.type("application/json")
        res.json(result)
    } catch (err) {
        res.status(500);
        res.type("application/json")
        console.log(err);
    }
})

mongoClient.connect()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`App is listening on ${PORT}`);
        })
    }).catch(e=>{
        console.log("Cannot connect to db ",e);
    })

