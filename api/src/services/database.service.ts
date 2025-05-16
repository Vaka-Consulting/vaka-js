import * as mongoDB from "mongodb";


export let _db:mongoDB.Db;
export async function db(): Promise<mongoDB.Db>{
    return new Promise<mongoDB.Db>((res,rej)=>{
        if (_db == undefined ){
            return connectToDatabase().then(e=>res(e))
        }
        return res(_db);
    })
    
}

export async function connectToDatabase(): Promise<mongoDB.Db> {

    const id = process.env.AWS_ACCESS_KEY_ID || ''
    const secret = process.env.AWS_SECRET_ACCESS_KEY || ''
    const token = process.env.AWS_SESSION_TOKEN || ''
    const server = process.env.DB_SERVER_NAME || ''
    const db = process.env.DB_NAME || 'explorer'
    const AWS_IAM_URI = `mongodb+srv://${encodeURIComponent(id)}:${encodeURIComponent(secret)}@${server}/${db}?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:${encodeURIComponent(token)}`;
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_URI || AWS_IAM_URI);

    await client.connect();

    _db = client.db(process.env.DB_NAME);

    // const policyAssetsCollection: mongoDB.Collection = db.collection("policy_assets");
    // collections.policy_assets = policyAssetsCollection;
    
    console.log(`Successfully connected to database: ${_db.databaseName} `);

    return _db;
}
