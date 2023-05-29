/// POSTS
const posts = [
    {
        postId: 1,
        title: "Mutations",
        content: "You don't need anything more than this to implement mutations. But in many cases, you will find a number of different mutations that all accept the same input parameters. A common example is that creating an object in a database and updating an object in a database often take the same parameters. To make your schema simpler, you can use “input types” for this, by using the input keyword instead of the type keyword."
    },
    {
        postId: 2,
        title: "Getting started",
        content: "Before getting started, you should have Node v6 installed, although the examples should mostly work in previous versions of Node as well. For this guide, we won't use any language features that require transpilation, but we will use some ES6 features like Promises, classes, and fat arrow functions, so if you aren't familiar with them you might want to read up on them first."
    },
    {
        postId: 3,
        title: "Basic types",
        content: "In most situations, all you need to do is to specify the types for your API using the GraphQL schema language, taken as an argument to the buildSchema function."
    }
];

module.exports.getPosts = () => posts;

module.exports.getPostById = (postId) => {

    for (const post of posts) {
        if (post.postId === postId) {
            return post;
        }
    }

    return null;
}

module.exports.insertPost = (title, content) => {
    const postId = posts[posts.length - 1].postId + 1;

    const post = {
        postId,
        title,
        content
    };

    posts.push(post)

    return post;
}

module.exports.updatePost = (postId, title, content) => {
    for (const post of posts) {
        if (post.postId === postId) {
            post.content = content;
            post.title = title;
        }
    }

    return {
        postId,
        title,
        content
    }
}

module.exports.deletePost = (postId) => {
    const index = posts.findIndex(p => p.postId === postId)
    if (index >= 0) {
        const deletedPost = posts[index];
        posts.splice(index, 1);
        return deletedPost;
    }

    return null;
}


/// COMMENTS
const comments = [
    {
        commentId: 1,
        postId: 1,
        content: "This is a comment on post about Mutations"
    },
    {
        commentId: 2,
        postId: 1,
        content: "This is another comment on post about Mutations"
    },
    {
        commentId: 1,
        postId: 3,
        content: "This is a comment on post about Basic types"
    },
    {
        commentId: 2,
        postId: 3,
        content: "This is another comment on post about Basic types"
    }
];

module.exports.getComments = () => comments;

module.exports.getCommentById = (commentId) => {
    for (const comment of comments) {
        if (comment.commentId === commentId) {
            return comment;
        }
    }

    return null;
}

module.exports.getCommentsByPostId = (postId) => {
    const postComments = [];

    for (const comment of comments) {
        if (comment.postId === postId) {
            postComments.push(comment);
        }
    }

    return postComments;
}

module.exports.insertComment = (postId, content) => {
    const commentId = comments[comments.length - 1].commentId + 1;

    const comment = {
        commentId,
        postId,
        content
    };

    comments.push(comment)

    return comment;
}

module.exports.updateComment = (commentId, content) => {
    for (const comment of comments) {
        if (comment.commentId === commentId) {
            comment.content = content;
            return comment
        }
    }

    return null;
}

module.exports.deleteComment = (commentId) => {
    const index = comments.findIndex(p => p.commentId === commentId)
    if (index >= 0) {
        const deletedComment = comments[index];
        comments.splice(index, 1);
        return deletedComment;
    }

    return null;
}