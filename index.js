const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://rental_studio:${process.env.DB_PASS}@cluster0.zjrckls.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// ... (Your import statements and app setup)

async function run() {
  try {
    client.connect();
    const todocollection = client.db('TodoApp').collection('data');

app.get('/todos', async(req,res)=>{
      const qurey = {}
      const todos = await todocollection.find(qurey).toArray()
      res.send(todos)
    })

    app.post('/todos', async (req, res) => {
      const todo = req.body;
      const result = await todocollection.insertOne(todo);
      res.send(result);
    });

    
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

