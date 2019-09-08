const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
const cors = require("./cors");

module.exports.main = async (event) => {
    const params = {
        TableName: process.env.DYNAMO_DB_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    };

    try {
        await client.delete(params).promise();
        
        return cors.addHeaders({
            statusCode: 200,
            body: JSON.stringify({})       
        });
    } catch (error) {
        return cors.addHeaders({
            statusCode: 500,
            body: JSON.stringify(error)
        });
    }
};