const graphql = require('graphql');
const _ = require('lodash');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
} = graphql;

// GraphQLObjectType is used for defining objects
// GraphQLString is a scalar type for defining String
// GraphQLSchema is a type for Query and Mutation

const books = [
	{ name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' }, // Added authId here for access to authors
	{ name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
];

const authors = [
	{ name: 'Junot Diaz', age: 54, id: '1' },
	{ name: 'Richard Brown', age: 36, id: '2' },
	{ name: 'Marcus Green', age: 46, id: '3' },
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// console.log(parent);
				return _.find(authors, { id: parent.authorId });
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
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
				return _.find(books, { id: args.id });
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
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
