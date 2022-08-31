// Import Model, DataType & Sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Post extends Model {}

// Create Post
Post.init(
    // Create column names and declare properties for each column
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postTitle: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    //this is the comment
    postContent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //this may end up coming out depending on how the maps work
    locationData: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

// Export model 
module.exports = Post;