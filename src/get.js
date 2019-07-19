const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();

module.exports.main = async (event) => {
    const params = {
        TableName: process.env.DYNAMO_DB_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    };

    try {
        const result = await client.get(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)       
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};