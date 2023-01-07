async function Insert(client, dbName, collectionName, data) {
    const database = client.db(dbName).collection(collectionName);
    const Data = { ...data }
    try {
        // check if data exists in database
        if(await database.findOne({ data })){
            return "Exists";
        }else{
        const result = await database.insertOne(Data)
        return "Success";
        }
    }
    catch (err) {
        return "Error";
    }
}
module.exports = Insert