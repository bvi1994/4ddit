"use strict";

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_NAME, 'postgres', process.env.DATABASE_PASSWORD, {
    dialect: 'postgres'
});

sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

// MODELS GO HERE

var User = sequelize.define('user', {
  // Rememner that the user ID is generated automatically
    username: {
        type: Sequelize.STRING,
        allownull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allownull: false,
    },
    commentKarma: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    postKarma: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
});

var Thread = sequelize.define('thread', {
  // The author key would be from the username as a foreign key
  // Remember that the thread ID is generated automatically
    content: {
        type: Sequelize.STRING,
        allownull: false,
    },
    postKarma: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
});

var Comment = sequelize.define('comment', {
  // The author key would be from the username as a foreign key
  // Remember that the comment ID is generated automatically
    author: {
        type: Sequelize.STRING,
        allownull: false,
        // foreignKeyConstraint: true,
    },
    content: {
        type: Sequelize.STRING,
        allownull: false,
    },
    commentKarma: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    // date: {
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.NOW
    // },
  // The thread ID field is the comment belongs to in the thread
  // We will get that from the thread ID schema as shown above
    threadID: {
        type: Sequelize.INTEGER,
        allownull: false,
        // foreignKeyConstraint: true,
    },
  // This is a reply to a comment. Basically we are having the subcomment
  // be a child of the comment that we are replying to. Note that if
  // it is null, this implies that the comment is the starting node.
    parentID: {
        type: Sequelize.INTEGER,
    }
});

User.hasMany(Thread, { as: 'children', foreignKey: 'threadId' });
Thread.belongsTo(User, { as: 'children', foreignKey: 'threadId' });
Thread.hasMany(Comment, { as: 'children', foreignKey: 'commentId' });
Comment.belongsTo(Thread, { as: 'children', foreignKey: 'commentId' });

module.exports = {
    User,
    Thread,
    Comment,
    sequelize,
    // EXPORT models HERE
};
