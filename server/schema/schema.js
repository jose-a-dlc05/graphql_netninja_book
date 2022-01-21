const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// GraphQLObjectType is used for defining objects
// GraphQLString is a scalar type for defining String
// GraphQLSchema is a type for Query and Mutation

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
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
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// code to get data from db / other source
				return _.find(book, { id: args.id });
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
