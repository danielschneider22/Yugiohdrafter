import { Collection, Db, MongoClient } from 'mongodb';
import { Booster } from './constants/Booster';
import { CardSet } from './constants/CardSet';
import { ResetToken } from './constants/ResetToken';
import { RoomPlayer } from './constants/RoomPlayer';
import { User } from './constants/User';
import { Room } from './models/Room';

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
const collections: { cardSets?: Collection<CardSet>, users?: Collection<User>, resetTokens?: Collection<ResetToken>, rooms?: Collection<Room>, roomPlayers?: Collection<RoomPlayer>, boosters?: Collection<Booster> } = {}

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

    const roomsCollection: Collection<Room> = db.collection('rooms');
    collections.rooms = roomsCollection;

    const roomPlayersCollection: Collection<RoomPlayer> = db.collection('roomPlayers');
    collections.roomPlayers = roomPlayersCollection;

    const boostersCollection: Collection<Booster> = db.collection('boosters');
    collections.boosters = boostersCollection;

    return {
        client: cachedClient,
        db: cachedDb,
        collections,
    };
}