"use strict";

var chai = require("chai");

var chaiHttp = require("chai-http");

var server = require("../src/index");

var path = require("path");

var user = null;
var token = null;
var userId = null;
var blog = null;
var blogId = null;
chai.should();
chai.use(chaiHttp);
describe("Users API", function () {
  // Test POST route
  describe("POST /api/users", function () {
    user = {
      "username": "Test",
      "email": "test65@gmail.com",
      "password": "1234567890"
    };
    it("It should return 200 status code", function (done) {
      chai.request(server).post("/api/users/register").send(user).end(function (error, response) {
        if (error) return done(error);
        userId = response.body.user;
        response.should.have.status(200);
        done();
      });
    });
  }); // Test Login route

  describe("POST /api/users/login", function () {
    it("It should return 200 status code", function (done) {
      var userLoginData = {
        "email": "".concat(user.email),
        "password": "".concat(user.password)
      };
      chai.request(server).post("/api/users/login").send(userLoginData).end(function (error, response) {
        if (error) return done(error);
        token = response.body.token;
        response.should.have.status(200);
        response.body.should.have.property("token");
        done();
      });
    });
  }); // Test GET route

  describe("GET api/users", function () {
    it("It should return all users", function (done) {
      chai.request(server).get("/api/users").set("Authorization", token).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(200);
        done();
      });
    });
  });
  describe("GET /api/users", function () {
    it("It should return 401 status code", function (done) {
      chai.request(server).get("/api/users").end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(401);
        done();
      });
    });
    it("It should NOT get all the users", function (done) {
      chai.request(server).get("/api/user").end(function (error, response) {
        response.should.have.status(404);
        done();
      });
    });
  }); // Test GET single user route

  describe("GET /api/users/:id", function () {
    var userId2 = "2324";
    it("It should return 404 status code", function (done) {
      chai.request(server).get("/api/users/:".concat(userId2)).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(404);
        done();
      });
    });
  }); // Test POST route with uncomplete inputs

  describe("POST /api/users", function () {
    var fakeUser = {
      "username": "Test",
      "email": "test48@gmail.com"
    };
    it("It should return 400 status code", function (done) {
      chai.request(server).post("/api/users/register").send(fakeUser).end(function (error, response) {
        if (error) return;
        response.should.have.status(400);
        done();
      });
    });
  }); // Delete user with invalid id

  describe("DELETE /api/users/:id", function () {
    var userId2 = "2324";
    it("It should return 404 status code", function (done) {
      chai.request(server)["delete"]("/api/users/:".concat(userId2)).set("Authorization", token).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(404);
        done();
      });
    }); // Test deleting user when not authenticated

    describe("DELETE /api/users/:id", function () {
      it("It should return 401 status code", function (done) {
        chai.request(server)["delete"]("/api/users/".concat(userId)).end(function (error, response) {
          if (error) return done(error);
          response.should.have.status(401);
          done();
        });
      });
    });
  });
}); // Blog API

describe("Blogs API", function () {
  //     // Test POST route-Blogs
  describe("POST /api/blogs", function () {
    blog = {
      "title": "From test, here is the title",
      "message": "Here is the message, from testing"
    };
    it("It should return 200 status code", function (done) {
      chai.request(server).post("/api/blogs").set("Authorization", token).field(blog).attach("image", "".concat(path.join(__dirname, '../../UI/images/agyle.jpg'))).type("form").end(function (error, response) {
        if (error) return done(error);
        blogId = response.body.data._id;
        response.should.have.status(200);
        done();
      });
    });
  }); //     // Test POST route-Blogs with wrong image format

  describe("POST /api/blogs", function () {
    blog = {
      "title": "From test, here is the title",
      "message": "Here is the message, from testing"
    };
    it("It should return 400 status code", function (done) {
      chai.request(server).post("/api/blogs").set("Authorization", token).field(blog).attach("image", "".concat(path.join(__dirname, '../../UI/images/test.pdf'))).type("form").end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(400);
        done();
      });
    });
  }); // Test GET route-Blogs

  describe("GET/api/blogs", function () {
    it("It should return all blogs", function (done) {
      chai.request(server).get("/api/blogs").end(function (error, response) {
        if (error) return done(error);
        response.body.should.have.property('data');
        response.body.should.be.a("object");
        response.should.have.status(200);
        done();
      });
    });
  }); // Test single blog

  describe("GET /api/blogs:id", function () {
    it("It should return single blog", function (done) {
      chai.request(server).get("/api/blogs/".concat(blogId)).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(200);
        done();
      });
    });
  }); // Test delete blog

  describe("DELETE /api/blogs:id", function () {
    var FakeblogId = "1234";
    it("It should return 401", function (done) {
      chai.request(server)["delete"]("/api/blogs/".concat(FakeblogId)).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(401);
        done();
      });
    });
  }); // Test delete blog

  describe("DELETE /api/blogs:id", function () {
    var FakeblogId = "1234";
    it("It should return 404", function (done) {
      chai.request(server)["delete"]("/api/blogs/".concat(FakeblogId)).set("Authorization", token).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(404);
        done();
      });
    });
  }); // Test delete blog when unauthenticated

  describe("DELETE /api/blogs:id", function () {
    it("It should return 401", function (done) {
      chai.request(server)["delete"]("/api/blogs/".concat(blogId)).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(401);
        done();
      });
    });
  }); //     // Test POST route-Blogs when not authenticated

  describe("POST /api/blogs", function () {
    var blogUpdateData = {
      "title": "From test, here is the title",
      "message": "Here is the message, from testing"
    };
    it("It should return 401 status code", function (done) {
      chai.request(server).post("/api/blogs").field(blogUpdateData).attach("image", "".concat(path.join(__dirname, '../../UI/images/agyle.jpg'))).type("form").end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(401);
        done();
      });
    });
  }); // Test PATCH ON BLOGS WITH UNIXISTING ID

  describe("PATCH /api/blogs", function () {
    var blogUpdate = {
      "title": "From test, here is the title updated",
      "message": "Here is the message, from testing updated"
    };
    var FakeblogId = "1234";
    it("It should return 400 status code", function (done) {
      chai.request(server).patch("/api/blogs/".concat(FakeblogId)).set("Authorization", token).field(blogUpdate).attach("image", "".concat(path.join(__dirname, '../../UI/images/agyle.jpg'))).type("form").end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(400);
        done();
      });
    });
  }); // Test PATCH ON BLOGS WHEN NOT AUTHENTICATED

  describe("PATCH /api/blogs", function () {
    var blogUpdate = {
      "title": "From test, here is the title updated",
      "message": "Here is the message, from testing updated"
    };
    it("It should return 401 status code", function (done) {
      chai.request(server).patch("/api/blogs/".concat(blogId)).field(blogUpdate).attach("image", "".concat(path.join(__dirname, '../../UI/images/agyle.jpg'))).type("form").end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(401);
        done();
      });
    });
  }); // Test PATCH ON BLOGS WHEN NOT AUTHENTICATED

  describe("PATCH /api/blogs", function () {
    var blogUpdate = {
      "title": "From test, here is the title updated",
      "message": "Here is the message, from testing updated"
    };
    it("It should return 200 status code", function (done) {
      chai.request(server).patch("/api/blogs/".concat(blogId)).field(blogUpdate).set("Authorization", token).attach("image", "".concat(path.join(__dirname, '../../UI/images/agyle.jpg'))).type("form").end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(200);
        done();
      });
    });
  }); // Test delete blog successfully

  describe("DELETE /api/blogs/:id", function () {
    it("It should return 200 status code", function (done) {
      chai.request(server)["delete"]("/api/blogs/".concat(blogId)).set("Authorization", token).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(200);
        done();
      });
    });
  });
}); // Queries API

describe("Queries API", function () {
  // Test GET route-Queries
  describe("GET /api/queries", function () {
    it("It should return all queries", function (done) {
      chai.request(server).get("/api/queries").end(function (error, response) {
        if (error) return done(error);
        response.body.should.have.property('data');
        response.body.should.be.a("object");
        response.should.have.status(200);
        done();
      });
    });
  });
  describe("GET /api/queries", function () {
    it("It should NOT return queries", function (done) {
      chai.request(server).get("/api/querie").end(function (error, response) {
        response.should.have.status(404);
        done();
      });
    });
  }); // Test POST route

  describe("POST /api/queries", function () {
    var query = {
      "name": "Mocha2",
      "email": "test1@gmail.com",
      "message": "Testing with mocha"
    };
    it("It should return 200 status code", function (done) {
      chai.request(server).post("/api/queries").send(query).end(function (error, response) {
        response.body.should.have.property("data");
        response.body.should.be.a('object');
        response.should.have.status(200);
        done();
      });
    });
  }); // Test POST route with uncomplete inputs

  describe("POST /api/queries", function () {
    var query = {
      "name": "Mocha2",
      "email": "test1@gmail.com"
    };
    it("It should return 400 status code", function (done) {
      chai.request(server).post("/api/queries").send(query).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(400);
        done();
      });
    });
  });
});
describe("DELETE USER api/users", function () {
  // Test delete user successfully
  describe("DELETE /api/users/:id", function () {
    it("It should return 200 status code", function (done) {
      chai.request(server)["delete"]("/api/users/".concat(userId)).set("Authorization", token).end(function (error, response) {
        if (error) return done(error);
        response.should.have.status(200);
        done();
      });
    });
  });
});