const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
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
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ":product": order.product,
            ":quantity": order.quantity,
            ":updated": timestamp
        },
        UpdateExpression: "SET product = :product, quantity = :quantity, updated = :updated",
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await client.update(params).promise();
        
        return cors.addHeaders({
            statusCode: 200,
            body: JSON.stringify(result.Attributes)       
        });
    } catch (error) {
        return cors.addHeaders({
            statusCode: 500,
            body: JSON.stringify(error)
        });
    }
};