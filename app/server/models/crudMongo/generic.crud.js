import { ObjectId } from 'mongodb';
import mongo from '../../database/mongo.connection.js';
import dotenv from 'dotenv';
dotenv.config();

const client = await mongo.connectToMongo();

const mydb = process.env.MONGO_DB;

export default {
    /**
     * Obtener toda la colleción.
     * @param {String} coll 
     * @returns 
     */
    getAll: async (coll) => {
        const db = client.db(mydb)
        const collection = db.collection(coll)
        const result = await collection.find({}).toArray();

        return result;
    },
    /**
     * Obtener una playlist tramite nombre colleción y id playlist.
     * @param {String} coll 
     * @param {Number} id 
     * @returns 
     */
    getOne: async(coll, id) => {
        const db = client.db(mydb);
        return await db.collection(coll).find({'_id': new ObjectId(id)}).toArray();    
    }
}
