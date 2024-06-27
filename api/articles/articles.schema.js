const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: String,
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} inconnue"
    } 
  }
});

let Article;

module.exports = Article = model("Article", articleSchema);

