const articleService = require("./articles.service");
const UnauthorizedError = require("../../errors/unauthorized");

class ArticleController {
    async create(req, res, next) {
        try {
            req.body.user = req.user.id;
            const article = await articleService.create(req.body);
            req.io.emit("article:create", article);
            res.status(201).json(article);
            
        } catch (err) {
          next(err);
        }
    }

    async update(req, res, next) {
        try {
            if(req.user.role ==="admin"){
                const id = req.params.id;
                const data = req.body;
                const modifiedService = await articleService.update(id, data);
                res.json(modifiedService);
            }else{
                next(new UnauthorizedError("not admin"))
            }
        } catch (err) {
          next(err);
        }
    }

    async delete(req, res, next) {
        try {
            if(req.user.role ==="admin"){
                const id = req.params.id;
                await articleService.delete(id);
                req.io.emit("article:delete", { id });
                res.status(204).send();
            }else{
                next(new UnauthorizedError("not admin"))
            }
        } catch (err) {
          next(err);
        }
    }
}

module.exports = new ArticleController();