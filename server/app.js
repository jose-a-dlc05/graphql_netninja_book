const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// express-graphql is installed because express by itself does not know how to handle graphql
const schema = require('./schema/schema');

const app = express(); // invoke express

const PORT = 4000; // Define and initialize the PORT variable to hold value of 4000

// bind express with graphql - https://graphql.org/graphql-js/express-graphql/
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
