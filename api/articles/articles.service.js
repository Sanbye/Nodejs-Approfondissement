const Article = require("./articles.schema")

class ArticleService {
    create(data) {
        const article = new Article(data);
        return article.save();
    }

    update(id, data) {
        return Article.findByIdAndUpdate(id, data, { new: true });
    }

    delete(id) {
        return Article.deleteOne({ _id: id });
    }

    getAllByUserId(id){
        return Article.find({user: id})
    }
}

module.exports = new ArticleService();