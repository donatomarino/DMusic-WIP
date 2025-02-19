import { ObjectId } from 'mongodb';
import mongo from '../../database/mongo.connection.js';

const client = await mongo.connectToMongo();

const mydb = 'DMusic';

export default {
    getAll: async (coll) => {
        const db = client.db(mydb)
        const collection = db.collection(coll)
        const result = await collection.find({}).toArray();

        return result;
    },
    getOne: async(coll, id) => {
        const db = client.db(mydb);
        return await db.collection(coll).find({'_id': new ObjectId(id)}).toArray();    
    }
}
