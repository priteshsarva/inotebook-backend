// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://priteshsarva9825:sSoYgDKyorWv52BC@clusterdb.cjysckg.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const connectToMongo = async ()=>{
//        try {
//               // Connect the client to the server	(optional starting in v4.7)
//               await client.connect();
//               // Send a ping to confirm a successful connection
//               await client.db("admin").command({ ping: 1 });
//               console.log("Pinged your deployment. You successfully connected to MongoDB!");
//             } finally {
//               // Ensures that the client will close when you finish/error
//               // await client.close();
//             }
// }
// connectToMongo().catch(console.dir);

// module.exports = connectToMongo;


const Mongoose = require('mongoose');
const mongooseURI="mongodb+srv://priteshsarva9825:sSoYgDKyorWv52BC@clusterdb.cjysckg.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo= async ()=>{
       await Mongoose.connect(mongooseURI);
}

module.exports = connectToMongo;