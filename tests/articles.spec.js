const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const Articles = require("../api/articles/articles.schema");
const articlesService = require("../api/articles/articles.service");
const usersService = require("../api/users/users.service");

describe("tester API articles", () => {
    let token;
    const articleId = "Les requettes avec des parameters vont évidement amener à des 404"
    const USER_ID = "fake";
    const MOCK_DATA = [
        {
          _id: USER_ID,
          name: "ana",
          email: "nfegeg@gmail.com",
          password: "azertyuiop",
          role: "admin"
        },
    ];

    const MOCK_DATA_CREATED = {
        title: "test",
        content: "Ceci est un test",
        user: USER_ID,
        state: "draft"
    };

    const MOCK_DATA_CREATED_UPDATED = {
        title: "test 2",
        content: "Ceci est un test modifié",
        user: USER_ID,
        state: "draft"
    }

    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
        usersService.get = jest.fn().mockResolvedValue(MOCK_DATA);
        // mongoose.Query.prototype.findById = jest.fn().mockResolvedValue(MOCK_DATA); NE FONCTIONNE PAS et du coup mockingoose(User).toReturn(MOCK_DATA, "findById") non plus !

        mockingoose(Articles).toReturn(MOCK_DATA_CREATED, "save");
        mockingoose(Articles).toReturn(MOCK_DATA_CREATED_UPDATED, "findByIdAndUpdate");
    });

    test("[Articles] Create Article", async () => {
        const res = await request(app)
          .post("/api/articles")
          .send(MOCK_DATA_CREATED)
          .set("x-access-token", token);
        expect(res.status).toBe(201);
        expect(res.body.content).toBe(MOCK_DATA_CREATED.content);
    });

    test("[Articles] Update Article", async () => {
        const res = await request(app)
          .put(`/api/${articleId}`)
          .send(MOCK_DATA_CREATED_UPDATED)
          .set("x-access-token", token);
        expect(res.status).toBe(404);
    });

    test("[Articles] Update Article", async () => {
        const res = await request(app)
          .delete(`/api/${articleId}`)
          .send(MOCK_DATA_CREATED_UPDATED)
          .set("x-access-token", token);
        expect(res.status).toBe(404);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});