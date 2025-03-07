import { ObjectId } from 'mongodb';
import mongo from '../../database/mongo.connection.js';
import dotenv from 'dotenv';
dotenv.config();

const client = await mongo.connectToMongo();

const mydb = process.env.MONGO_DB;

export default {
    /**
     * Obtener toda la colleción.
     * @async
     * @function getAll
     * @param {String} coll - Nombre de la colleción
     * @returns {Array}
     */
    getAll: async (coll) => {
        const db = client.db(mydb)
        const collection = db.collection(coll)
        const result = await collection.find({}).toArray();

        return result;
    },
    /**
     * Obtener una playlist tramite nombre colleción y id playlist.
     * @async
     * @function getOne
     * @param {String} coll - Nombre de la colleción
     * @param {Number} id - id de la playlist
     * @returns {Array}
     */
    getOne: async(coll, id) => {
        const db = client.db(mydb);
        return await db.collection(coll).find({'_id': new ObjectId(id)}).toArray();    
    }
}
