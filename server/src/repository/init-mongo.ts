import {Db, MongoClient} from 'mongodb';
import assert from 'assert';

// Connection URL
const url = 'mongodb://mongo:27017';

// Database Name
const dbName = 'emergencyQueue';

// Create a new MongoClient
const client = new MongoClient(url);

// Database variable
let db: Db;

// Use connect method to connect to the Server
export function connect(callback: Function) {
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db = client.db(dbName);
        callback();
    });
}

export function getDB() {
    return db;
}

export function close() {
    client.close();
}



