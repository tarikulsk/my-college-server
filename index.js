const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const colleges = require('./data/colleges.json')

app.use(cors());
app.use(express.json());


// A0cLegwkpA9X32CH
// tarikulsk4


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tarikulsk4:A0cLegwkpA9X32CH@cluster0.pisjypu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("applyDB");
        const applyCollection = database.collection("apply");

        app.get('/apply', async (req, res) => {
            const applied = applyCollection.find();
            const result = await applied.toArray();
            res.send(result)
        })

        app.post(('/apply'), async (req, res) => {
            const apply = req.body;
            console.log('Application Successful', apply);
            const result = await applyCollection.insertOne(apply);
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();

//         const database = client.db("usersDB");
//         const userCollection = database.collection("users");

//         app.get('/users', async (req, res) => {
//             const cursor = userCollection.find()
//             const results = await cursor.toArray();
//             res.send(results)
//         })

//         app.post('/users', async (req, res) => {
//             const user = req.body;
//             console.log('new user', user);
//             const result = await userCollection.insertOne(user);
//             res.send(result);
//         })
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }
// run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Simple Crud is Running')

})
app.get('/colleges', (req, res) => {
    res.send(colleges)
})

app.listen(port, () => {
    console.log(`Simple Crud in Running on port: ${port}`)
})