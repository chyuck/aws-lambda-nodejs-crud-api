const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
const cors = require("./cors");

module.exports.main = async () => {
    const params = {
        TableName: process.env.DYNAMO_DB_TABLE
    }; 

    try {
        const result = await client.scan(params).promise();
        
        return cors.addHeaders({
            statusCode: 200,
            body: JSON.stringify(result.Items)       
        });
    } catch (error) {
        return cors.addHeaders({
            statusCode: 500,
            body: JSON.stringify(error)
        });
    }
};