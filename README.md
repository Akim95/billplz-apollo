# BILLPLZ APOLLO GRAPHQL SERVER

## Combined V3 + V4 Billplz REST Api

## Running the server

### 1. Install NodeJS
Make sure you have [NodeJS](https://nodejs.org/en/) installed on your machine.

### 2. Install Typescript
```
npm install -g typescript
```

### 3. Clone repo and Install Dependencies
- npm
```
git clone [repo]
npm install
```

### 4. SET Environment Variables (.env file):
```
// set node environment var.
export NODE_ENV="staging or production"

// set api key var.
export BILLPLZ_API_SECRET_KEY="your api secret key"
```

### 5. Run the server
```
npm start
```

### HOW IT WORKS?

* Open GraphQL Playground ```http://localhost:[port]```

#### Query

Get a bill:

```
{
  bill(BILL_ID: "BILL ID HERE") {
    email
    name
    amount
    description
    state
    paid
    url
  }
}
```

#### Mutation

Create a collection:

```
mutation {
  createCollection(title: "COLLECTION TITLE") {
    id
  }
}
```

Billplz Apollo is [MIT - licensed](LICENSE).
