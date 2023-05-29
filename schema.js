const db = require('./fake-database');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');

const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: () => ({
        postId: { type: GraphQLInt },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve({ postId }) {
                const comments = db.getCommentsByPostId(postId);
                return comments;
            }
        }
    })
});

const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        commentId: { type: GraphQLInt },
        postId: { type: GraphQLInt },
        content: { type: GraphQLString },
        post: {
            type: PostType,
            resolve({ postId }) {
                const post = db.getPostById(postId);
                return post;
            }
        }
    })
});

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        posts: {
            type: new GraphQLList(PostType),
            resolve() {
                const posts = db.getPosts();
                return posts;
            }
        },
        post: {
            type: PostType,
            args: { postId: { type: GraphQLInt } },
            resolve(_, { postId }) {
                const post = db.getPostById(postId);
                return post;
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve() {
                const comments = db.getComments();
                return comments;
            }
        },
        comment: {
            type: CommentType,
            args: { commentId: { type: GraphQLInt } },
            resolve(_, { commentId }) {
                const comment = db.getCommentById(commentId);
                return comment;
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addPost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve(_, { title, content }) {
                const post = db.insertPost(title, content)
                return post;
            }
        },
        updatePost: {
            type: PostType,
            args: {
                postId: { type: GraphQLInt },
                title: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve(_, { postId, title, content }) {
                const post = db.updatePost(postId, title, content)
                return post;
            }
        },
        deletePost: {
            type: PostType,
            args: {
                postId: { type: GraphQLInt },
            },
            resolve(_, { postId, title, content }) {
                const post = db.deletePost(postId)
                return post;
            }
        },
        addComment: {
            type: CommentType,
            args: {
                postId: { type: GraphQLInt },
                content: { type: GraphQLString }
            },
            resolve(_, { postId, content }) {
                const comment = db.insertComment(postId,content)
                return comment;
            }
        },
        updateComment: {
            type: CommentType,
            args: {
                commentId: { type: GraphQLInt },
                content: { type: GraphQLString }
            },
            resolve(_, { commentId, content }) {
                const comment = db.updateComment(commentId, content)
                return comment;
            }
        },
        deleteComment: {
            type: CommentType,
            args: {
                commentId: { type: GraphQLInt }
            },
            resolve(_, { commentId }) {
                const comment = db.deleteComment(commentId)
                return comment;
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query,
    mutation
})