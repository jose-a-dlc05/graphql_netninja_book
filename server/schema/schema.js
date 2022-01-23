const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// GraphQLObjectType is used for defining objects
// GraphQLString is a scalar type for defining String
// GraphQLSchema is a type for Query and Mutation

const books = [
	{ name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
	{ name: 'The Final Empire', genre: 'Fantasy', id: '2' },
	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

// Why are the fields above being wrapped in a function?

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db / other source
				console.log(typeof args.id); // in reference to GRAPHQLID vs GRAPHQLString
				return _.find(books, { id: args.id });
			},
		},
	},
});

// The RootQuery is a type of GraphQLObjectType
// The fields object is used for defining all fields in a particular type
// The RootQueryType has one field called book of type BookType with an id parameter of type GraphQLString. That BookType resolves to get what it returns from the data source.

module.exports = new GraphQLSchema({
	query: RootQuery,
});

// Explain why one would use GRAPHQLID vs GRAPHQLString for the identifier variable
