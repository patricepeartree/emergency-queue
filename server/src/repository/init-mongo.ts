import { Db, MongoClient } from "mongodb";

import variables from "../utils/environment";

// Connection URL
const MONGO_URL = `mongodb://${variables.MONGO_HOST}:${variables.MONGO_PORT}`;

// Database Name
const APP_DATABASE_NAME = 'emergencyQueue';

// Create a new MongoClient
const client = new MongoClient(MONGO_URL);

// Database variable
let db: Db;

// Use connect method to connect to the Server
export function initMongoConnection(): Promise<Db> {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            if (err) {
                reject(err);
            }
            console.log("Connected successfully to Mongo DB.");
            db = client.db(APP_DATABASE_NAME);
            resolve(db);
        });
    });
}

export function getDB(): Db {
    return db;
}

export function close() {
    client.close();
}
