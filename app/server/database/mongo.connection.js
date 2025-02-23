import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/'

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