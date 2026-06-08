const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const db = client.db("wanderlust")

        const destinationCollection = db.collection("destinations")

        app.get("/destination", async (req, res) => {
            const result = await destinationCollection.find().toArray();
            res.json(result);
        });

        app.post('/destination', async (req, res) => {
            const destinationData = req.body
            console.log(destinationData);
            const result = await destinationCollection.insertOne(destinationData)

            res.json(result)
        })

 

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running in port 5000');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});



// CoK8h52Tbsp6z2Ue

// wanderlust