import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';


let mongo: any;
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (const col of collections) {
        await col.deleteMany({});
    } 
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});