import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDB() {
    if (cachedClient != null && cachedDb != null) {
        return { client: cachedClient, db: cachedDb };
    }

    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
        throw new Error('MONGODB_URI is not defined in .env.local');
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    cachedClient = client;
    cachedDb = cachedClient.db('smart-apartment-finder');

    return { client: cachedClient, db: cachedDb };
}