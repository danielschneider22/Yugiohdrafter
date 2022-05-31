import { Collection, Db, MongoClient } from 'mongodb';
import { CardSet } from './constants/CardSet';
import { ResetToken } from './constants/ResetToken';
import { User } from './constants/User';

const MONGODB_URI = process.env.MONGODB_URI || "";
const MONGODB_DB = process.env.DB_NAME || "";

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
const collections: { cardSets?: Collection<CardSet>, users?: Collection<User>, resetTokens?: Collection<ResetToken> } = {}

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
            collections
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts as any);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;
    
    const cardSetsCollection: Collection<CardSet> = db.collection('cardSets');
    collections.cardSets = cardSetsCollection;

    const usersCollection: Collection<User> = db.collection('users');
    collections.users = usersCollection;

    const resetTokensCollection: Collection<ResetToken> = db.collection('resetTokens');
    collections.resetTokens = resetTokensCollection;

    return {
        client: cachedClient,
        db: cachedDb,
        collections,
    };
}