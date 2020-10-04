let chai = require("chai")
let chaiHttp = require("chai-http");
let server = require("../src/index");
let path = require("path")

let user = null
let token = null
let userId = null
let blog = null
let blogId = null

chai.should()
chai.use(chaiHttp)


describe("Users API", () => {
    // Test POST route
    describe("POST /api/users", () => {
            user = {
                "username": "Test",
                "email": "test65@gmail.com",
                "password": "1234567890"
            }
            it("It should return 200 status code", (done) => {
                chai.request(server)
                    .post(`/api/users/register`)
                    .send(user)
                    .end((error, response) => {
                        if (error) return done(error)
                        userId = response.body.user
                        response.should.have.status(200);
                        done();
                    })
            })

        })
        // Test Login route
    describe("POST /api/users/login", () => {
            it("It should return 200 status code", (done) => {
                const userLoginData = {
                    "email": `${user.email}`,
                    "password": `${user.password}`,
                }
                chai.request(server)
                    .post(`/api/users/login`)
                    .send(userLoginData)
                    .end((error, response) => {
                        if (error) return done(error)
                        token = response.body.token
                        response.should.have.status(200);
                        response.body.should.have.property("token")
                        done();
                    })
            })

        })
        // Test GET route
    describe("GET api/users", () => {
        it("It should return all users", (done) => {
            chai.request(server)
                .get("/api/users")
                .set("Authorization", token)
                .end((error, response) => {
                    if (error) return done(error)
                    response.should.have.status(200);
                    done();
                })
        })
    })
    describe("GET /api/users", () => {
            it("It should return 401 status code", (done) => {
                chai.request(server)
                    .get("/api/users")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(401);
                        done();
                    })
            })
            it("It should NOT get all the users", (done) => {
                chai.request(server)
                    .get("/api/user")
                    .end((error, response) => {
                        response.should.have.status(404);
                        done();
                    })
            })
        })
        // Test GET single user route
    describe("GET /api/users/:id", () => {
        const userId2 = "2324"
        it("It should return 404 status code", (done) => {
            chai.request(server)
                .get(`/api/users/:${userId2}`)
                .end((error, response) => {
                    if (error) return done(error)
                    response.should.have.status(404);
                    done();
                })
        })

    })

    // Test POST route with uncomplete inputs
    describe("POST /api/users", () => {
        const fakeUser = {
            "username": "Test",
            "email": "test48@gmail.com",
        }
        it("It should return 400 status code", (done) => {
            chai.request(server)
                .post(`/api/users/register`)
                .send(fakeUser)
                .end((error, response) => {
                    if (error) return
                    response.should.have.status(400);
                    done();
                })
        })

    })


    // Delete user with invalid id
    describe("DELETE /api/users/:id", () => {
        const userId2 = "2324"
        it("It should return 404 status code", (done) => {
                chai.request(server)
                    .delete(`/api/users/:${userId2}`)
                    .set("Authorization", token)
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(404);
                        done();
                    })
            })
            // Test deleting user when not authenticated
        describe("DELETE /api/users/:id", () => {
            it("It should return 401 status code", (done) => {
                chai.request(server)
                    .delete(`/api/users/${userId}`)
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(401);
                        done();
                    })
            })

        })

    })

});

// Blog API

describe("Blogs API", () => {
    //     // Test POST route-Blogs
    describe("POST /api/blogs", () => {
            blog = {
                "title": "From test, here is the title",
                "message": "Here is the message, from testing"
            }
            it("It should return 200 status code", (done) => {
                chai.request(server)
                    .post("/api/blogs")
                    .set("Authorization", token)
                    .field(blog)
                    .attach("image", `${path.join(__dirname,'../../UI/images/agyle.jpg')}`)
                    .type("form")
                    .end((error, response) => {
                        if (error) return done(error)
                        blogId = response.body.data._id
                        response.should.have.status(200);
                        done();
                    })
            })

        })
        //     // Test POST route-Blogs with wrong image format
    describe("POST /api/blogs", () => {
            blog = {
                "title": "From test, here is the title",
                "message": "Here is the message, from testing"
            }
            it("It should return 400 status code", (done) => {
                chai.request(server)
                    .post("/api/blogs")
                    .set("Authorization", token)
                    .field(blog)
                    .attach("image", `${path.join(__dirname,'../../UI/images/test.pdf')}`)
                    .type("form")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(400);
                        done();
                    })
            })

        })
        // Test GET route-Blogs
    describe("GET/api/blogs", () => {
            it("It should return all blogs", (done) => {
                chai.request(server)
                    .get("/api/blogs")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.body.should.have.property('data')
                        response.body.should.be.a("object")
                        response.should.have.status(200);
                        done();
                    })
            })


        })
        // Test single blog
    describe("GET /api/blogs:id", () => {
            it("It should return single blog", (done) => {
                chai.request(server)
                    .get(`/api/blogs/${blogId}`)
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(200);
                        done();
                    })
            })


        })
        // Test delete blog
    describe("DELETE /api/blogs:id", () => {
            const FakeblogId = "1234"
            it("It should return 401", (done) => {
                chai.request(server)
                    .delete(`/api/blogs/${FakeblogId}`)
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(401);
                        done();
                    })
            })


        })
        // Test delete blog
    describe("DELETE /api/blogs:id", () => {
            const FakeblogId = "1234"
            it("It should return 404", (done) => {
                chai.request(server)
                    .delete(`/api/blogs/${FakeblogId}`)
                    .set("Authorization", token)
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(404);
                        done();
                    })
            })


        })
        // Test delete blog when unauthenticated
    describe("DELETE /api/blogs:id", () => {
            it("It should return 401", (done) => {
                chai.request(server)
                    .delete(`/api/blogs/${blogId}`)
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(401);
                        done();
                    })
            })


        })
        //     // Test POST route-Blogs when not authenticated
    describe("POST /api/blogs", () => {
            const blogUpdateData = {
                "title": "From test, here is the title",
                "message": "Here is the message, from testing"
            }
            it("It should return 401 status code", (done) => {
                chai.request(server)
                    .post("/api/blogs")
                    .field(blogUpdateData)
                    .attach("image", `${path.join(__dirname,'../../UI/images/agyle.jpg')}`)
                    .type("form")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(401);
                        done();
                    })
            })


        })
        // Test PATCH ON BLOGS WITH UNIXISTING ID
    describe("PATCH /api/blogs", () => {
            const blogUpdate = {
                "title": "From test, here is the title updated",
                "message": "Here is the message, from testing updated"
            }
            const FakeblogId = "1234"
            it("It should return 400 status code", (done) => {
                chai.request(server)
                    .patch(`/api/blogs/${FakeblogId}`)
                    .set("Authorization", token)
                    .field(blogUpdate)
                    .attach("image", `${path.join(__dirname,'../../UI/images/agyle.jpg')}`)
                    .type("form")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(400);
                        done();
                    })
            })


        })
        // Test PATCH ON BLOGS WHEN NOT AUTHENTICATED
    describe("PATCH /api/blogs", () => {
            const blogUpdate = {
                "title": "From test, here is the title updated",
                "message": "Here is the message, from testing updated"
            }
            it("It should return 401 status code", (done) => {
                chai.request(server)
                    .patch(`/api/blogs/${blogId}`)
                    .field(blogUpdate)
                    .attach("image", `${path.join(__dirname,'../../UI/images/agyle.jpg')}`)
                    .type("form")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(401);
                        done();
                    })
            })


        })
        // Test PATCH ON BLOGS WHEN NOT AUTHENTICATED
    describe("PATCH /api/blogs", () => {
            const blogUpdate = {
                "title": "From test, here is the title updated",
                "message": "Here is the message, from testing updated"
            }
            it("It should return 200 status code", (done) => {
                chai.request(server)
                    .patch(`/api/blogs/${blogId}`)
                    .field(blogUpdate)
                    .set("Authorization", token)
                    .attach("image", `${path.join(__dirname,'../../UI/images/agyle.jpg')}`)
                    .type("form")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(200);
                        done();
                    })
            })


        })
        // Test delete blog successfully
    describe("DELETE /api/blogs/:id", () => {
        it("It should return 200 status code", (done) => {
            chai.request(server)
                .delete(`/api/blogs/${blogId}`)
                .set("Authorization", token)
                .end((error, response) => {
                    if (error) return done(error)
                    response.should.have.status(200);
                    done();
                })
        })

    })
})

// Queries API
describe("Queries API", () => {
    // Test GET route-Queries
    describe("GET /api/queries", () => {
        it("It should return all queries", (done) => {
            chai.request(server)
                .get("/api/queries")
                .end((error, response) => {
                    if (error) return done(error)
                    response.body.should.have.property('data')
                    response.body.should.be.a("object")
                    response.should.have.status(200);
                    done();
                })
        })

    })
    describe("GET /api/queries", () => {
        it("It should NOT return queries", (done) => {
            chai.request(server)
                .get("/api/querie")
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                })
        })

    })

    // Test POST route
    describe("POST /api/queries", () => {
            const query = {
                "name": "Mocha2",
                "email": "test1@gmail.com",
                "message": "Testing with mocha"
            }
            it("It should return 200 status code", (done) => {
                chai.request(server)
                    .post(`/api/queries`)
                    .send(query)
                    .end((error, response) => {
                        response.body.should.have.property("data")
                        response.body.should.be.a('object')
                        response.should.have.status(200);
                        done();
                    })
            })

        })
        // Test POST route with uncomplete inputs
    describe("POST /api/queries", () => {
        const query = {
            "name": "Mocha2",
            "email": "test1@gmail.com",
        }
        it("It should return 400 status code", (done) => {
            chai.request(server)
                .post(`/api/queries`)
                .send(query)
                .end((error, response) => {
                    if (error) return done(error)
                    response.should.have.status(400);
                    done();
                })
        })

    })
})

describe("DELETE USER api/users", () => {
    // Test delete user successfully
    describe("DELETE /api/users/:id", () => {
        it("It should return 200 status code", (done) => {
            chai.request(server)
                .delete(`/api/users/${userId}`)
                .set("Authorization", token)
                .end((error, response) => {
                    if (error) return done(error)
                    response.should.have.status(200);
                    done();
                })
        })

    })
})