## CRUD API application for AWS Lambda (NodeJS)
Application provides APIs for manipulation of orders with the following attributes:
- ID
- Product
- Quantity
- Active Flag
- Create Time
- Change Time


## Setup ##
1. Install [NodeJS](https://nodejs.org/)
2. Install [Yarn](https://yarnpkg.com/en/docs/install)
3. Install [Serverless](https://serverless.com/):
```bash
npm install serverless -g
```
4. Install dependencies
```bash
yarn install
```


## Deployment ##
1. Setup AWS credentials:
```bash
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."
```
2. Deploy:
```bash
yarn deploy
```


## Testing ##

### Create Order ###
```bash
curl -X POST https://XXX.execute-api.us-east-1.amazonaws.com/dev/orders --data '{ "product":"Apple", "quantity":3, "active":true }'
```
Result:
```json
{  
   "id":"a5b97d20-aa3b-11e9-8f1e-ffa5d9f32bc9",
   "product":"Apple",
   "quantity":3,
   "active":true,
   "created":"2019-07-19T15:41:17.169Z",
   "updated":"2019-07-19T15:41:17.169Z"
}
```

### Get Order ###
```bash
curl https://XXX.execute-api.us-east-1.amazonaws.com/dev/orders/a5b97d20-aa3b-11e9-8f1e-ffa5d9f32bc9
```
Result:
```json
{  
   "id":"a5b97d20-aa3b-11e9-8f1e-ffa5d9f32bc9",
   "product":"Apple",
   "quantity":3,
   "active":true,
   "created":"2019-07-19T15:41:17.169Z",
   "updated":"2019-07-19T15:41:17.169Z"
}
```

### Update Order ###
```bash
curl -X PUT https://XXX.execute-api.us-east-1.amazonaws.com/dev/orders/a5b97d20-aa3b-11e9-8f1e-ffa5d9f32bc9 --data '{ "product":"Orange", "quantity":1, "active":false }'
```
Result:
```json
{  
   "id":"a5b97d20-aa3b-11e9-8f1e-ffa5d9f32bc9",
   "product":"Orange",
   "quantity":1,
   "active":false,
   "created":"2019-07-19T15:41:17.169Z",
   "updated":"2019-07-19T15:45:13.817Z"
}
```

### List Orders ###
```bash
curl https://XXX.execute-api.us-east-1.amazonaws.com/dev/orders
```
Result:
```json
[  
   {  
      "id":"a5b97d20-aa3b-11e9-8f1e-ffa5d9f32bc9",
      "product":"Orange",
      "quantity":1,
      "active":false,
      "created":"2019-07-19T15:41:17.169Z",
      "updated":"2019-07-19T15:45:13.817Z"
   }
]
```

### Delete Order ###
```bash
curl -X DELETE https://XXX.execute-api.us-east-1.amazonaws.com/dev/orders/a5b97d20-aa3b-11e9-8f1e-ffa5d9f32bc9
```
Result:
```json
{}
```