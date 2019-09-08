const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
const uuid = require("uuid/v1");
const validator = require("./validator");
const cors = require("./cors");

module.exports.main = async (event) => {
    const order = JSON.parse(event.body);
    const errors = validator.validate(order);
    if (errors.length > 0) {
        return cors.addHeaders({
            statusCode: 400,
            body: JSON.stringify(errors)
        });
    }

    const timestamp = new Date().toISOString();

    const params = {
        TableName: process.env.DYNAMO_DB_TABLE,
        Item: {
            id: uuid(),
            product: order.product,
            quantity: order.quantity,
            active: true,
            created: timestamp,
            updated: timestamp
        }
    };
    
    try {
        await client.put(params).promise();
        
        return cors.addHeaders({
            statusCode: 200,
            body: JSON.stringify(params.Item)       
        });
    } catch (error) {
        return cors.addHeaders({
            statusCode: 500,
            body: JSON.stringify(error)
        });
    }
};