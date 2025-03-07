import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGO_URL;

export default {
  /**
   * Conneccion a la base de datos de mongo.
   * @returns {Promise<MongoClient>}
   */
  connectToMongo: async () => {
    const client = new MongoClient(url)
    await client.connect()

    return client
  },

  /**
   * Cerrar la conneccion a la base de datos de mongo.
   * @returns {Promise<MongoClient>}
   */
  closeClient: async () => {
    const client = new MongoClient(url)
    await client.close()

    return client
  }
}