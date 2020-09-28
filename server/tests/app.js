let chai = require("chai")
let chaiHttp = require("chai-http");
let server = require("../src/index")


chai.should()
chai.use(chaiHttp)


describe("Users API", () => {
    // Test GET route
    describe("GET api/users", () => {
        it("It should return all users", (done) => {
            chai.request(server)
                .get("/api/users")
                .set("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjZlMzFmNDA3Njg1ZjM5MTA5ZDE5MGQiLCJpYXQiOjE2MDEwNjc0MjM2NDQsImV4cCI6MTYwMTA2NzUxMDA0NH0.mkiBI6czVuX9-28tikdRYkVWmf482Dx58NTJPz7bNmcbXrduqsvJj5UNbaaY8R48I4Xb_dVCUfhj1AYiBLwfUfiuFR6jATrehlqANHHV694eIe7RLe_dAZvCaqsgpv2u1XRmrvNv3hZ-q1AcUXRurYmzi9NnUsdti6aStpq0q-k9z5L1ggzh6uli7yfYuI9QtG2kVy2lUJLb4OAshdZq1iK1qKsCBXrr70V0SWSJwDFwJRGkH40fMPXq6Ayqbk8WN83EtJ0xkPEGNk9PecxRBHYZE-idbwbOSkcGfsELsWUMyvlPh15ifaAJg4CdPKD15oEGyEmiftmtM-12WnckiQ")
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
            const userId = "2324"
            it("It should return 404 status code", (done) => {
                chai.request(server)
                    .get(`/api/users/:${userId}`)
                    .end((error, response) => {
                        response.should.have.status(404);
                        done();
                    })
            })

        })
        // Test POST route
    describe("POST /api/users", () => {
            const user = {
                "username": "Test",
                "email": "test51@gmail.com",
                "password": "1234567890"
            }
            it("It should return 200 status code", (done) => {
                chai.request(server)
                    .post(`/api/users/register`)
                    .send(user)
                    .end((error, response) => {
                        response.should.have.status(200);
                        done();
                    })
            })

        })
        // Test POST route with uncomplete inputs
    describe("POST /api/users", () => {
        const user = {
            "username": "Test",
            "email": "test48@gmail.com",
        }
        it("It should return 400 status code", (done) => {
            chai.request(server)
                .post(`/api/users/register`)
                .send(user)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                })
        })

    })

    // Test Login route
    describe("POST /api/users/login", () => {
            const user = {
                "username": "Test",
                "email": "test10@gmail.com",
                "password": "1234567890"
            }
            it("It should return 200 status code", (done) => {
                chai.request(server)
                    .post(`/api/users/login`)
                    .send(user)
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(200);
                        response.body.should.have.property("token")
                        done();
                    })
            })

        })
        // Delete user
    describe("DELETE /api/users/:id", () => {
        const userId = "2324"
        it("It should return 404 status code", (done) => {
            chai.request(server)
                .delete(`/api/users/:${userId}`)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                })
        })

    })
});

// Blog API

describe("Blogs API", () => {
    // Test GET route-Blogs
    describe("GET/api/blogs", () => {
            it("It should return all blogs", (done) => {
                chai.request(server)
                    .get("/api/blogs")
                    .end((error, response) => {
                        response.body.should.have.property('data')
                        response.body.should.be.a("object")
                        response.should.have.status(200);
                        done();
                    })
            })


        })
        // Test single blog
    describe("GET /api/blogs:id", () => {
            const blogId = "5f60e441512ae01104aac445"
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
            const blogId = "1234"
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
        // Test delete blog
    describe("DELETE /api/blogs:id", () => {
            const blogId = "1234"
            it("It should return 404", (done) => {
                chai.request(server)
                    .delete(`/api/blogs/${blogId}`)
                    .set("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjZlMzFmNDA3Njg1ZjM5MTA5ZDE5MGQiLCJpYXQiOjE2MDEwNjc0MjM2NDQsImV4cCI6MTYwMTA2NzUxMDA0NH0.mkiBI6czVuX9-28tikdRYkVWmf482Dx58NTJPz7bNmcbXrduqsvJj5UNbaaY8R48I4Xb_dVCUfhj1AYiBLwfUfiuFR6jATrehlqANHHV694eIe7RLe_dAZvCaqsgpv2u1XRmrvNv3hZ-q1AcUXRurYmzi9NnUsdti6aStpq0q-k9z5L1ggzh6uli7yfYuI9QtG2kVy2lUJLb4OAshdZq1iK1qKsCBXrr70V0SWSJwDFwJRGkH40fMPXq6Ayqbk8WN83EtJ0xkPEGNk9PecxRBHYZE-idbwbOSkcGfsELsWUMyvlPh15ifaAJg4CdPKD15oEGyEmiftmtM-12WnckiQ")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(404);
                        done();
                    })
            })


        })
        // Test delete blog
    describe("DELETE /api/blogs:id", () => {
            const blogId = "5f60e441512ae01104aac445"
            it("It should return 404", (done) => {
                chai.request(server)
                    .delete(`/api/blogs/${blogId}`)
                    .set("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjZlMzFmNDA3Njg1ZjM5MTA5ZDE5MGQiLCJpYXQiOjE2MDEwNjc0MjM2NDQsImV4cCI6MTYwMTA2NzUxMDA0NH0.mkiBI6czVuX9-28tikdRYkVWmf482Dx58NTJPz7bNmcbXrduqsvJj5UNbaaY8R48I4Xb_dVCUfhj1AYiBLwfUfiuFR6jATrehlqANHHV694eIe7RLe_dAZvCaqsgpv2u1XRmrvNv3hZ-q1AcUXRurYmzi9NnUsdti6aStpq0q-k9z5L1ggzh6uli7yfYuI9QtG2kVy2lUJLb4OAshdZq1iK1qKsCBXrr70V0SWSJwDFwJRGkH40fMPXq6Ayqbk8WN83EtJ0xkPEGNk9PecxRBHYZE-idbwbOSkcGfsELsWUMyvlPh15ifaAJg4CdPKD15oEGyEmiftmtM-12WnckiQ")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(404);
                        done();
                    })
            })


        })
        // Test delete blog when unauthenticated
    describe("DELETE /api/blogs:id", () => {
            const blogId = "5f60e441512ae01104aac445"
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
        //     // Test POST route-Blogs
    describe("POST /api/blogs", () => {
            const blog = {
                "title": "From test, here is the title",
                "message": "Here is the message, from testing"
            }
            it("It should return 200 status code", (done) => {
                chai.request(server)
                    .post("/api/blogs")
                    .set("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjZlMzFmNDA3Njg1ZjM5MTA5ZDE5MGQiLCJpYXQiOjE2MDEwNjc0MjM2NDQsImV4cCI6MTYwMTA2NzUxMDA0NH0.mkiBI6czVuX9-28tikdRYkVWmf482Dx58NTJPz7bNmcbXrduqsvJj5UNbaaY8R48I4Xb_dVCUfhj1AYiBLwfUfiuFR6jATrehlqANHHV694eIe7RLe_dAZvCaqsgpv2u1XRmrvNv3hZ-q1AcUXRurYmzi9NnUsdti6aStpq0q-k9z5L1ggzh6uli7yfYuI9QtG2kVy2lUJLb4OAshdZq1iK1qKsCBXrr70V0SWSJwDFwJRGkH40fMPXq6Ayqbk8WN83EtJ0xkPEGNk9PecxRBHYZE-idbwbOSkcGfsELsWUMyvlPh15ifaAJg4CdPKD15oEGyEmiftmtM-12WnckiQ")
                    .field(blog)
                    .attach("image", "C:/Users/Patience/Andela/AndelaBrand/My-Brand/UI/images/agyle.jpg")
                    .type("form")
                    .end((error, response) => {
                        if (error) return done(error)
                        response.should.have.status(200);
                        done();
                    })
            })


        })
        //     // Test POST route-Blogs when not authenticated
    describe("POST /api/blogs", () => {
            const blog = {
                "title": "From test, here is the title",
                "message": "Here is the message, from testing"
            }
            it("It should return 401 status code", (done) => {
                chai.request(server)
                    .post("/api/blogs")
                    .field(blog)
                    .attach("image", "C:/Users/Patience/Andela/AndelaBrand/My-Brand/UI/images/agyle.jpg")
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
            const blogIdUpdate = "1234"
            it("It should return 400 status code", (done) => {
                chai.request(server)
                    .patch(`/api/blogs/${blogIdUpdate}`)
                    .set("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjZlMzFmNDA3Njg1ZjM5MTA5ZDE5MGQiLCJpYXQiOjE2MDEwNjc0MjM2NDQsImV4cCI6MTYwMTA2NzUxMDA0NH0.mkiBI6czVuX9-28tikdRYkVWmf482Dx58NTJPz7bNmcbXrduqsvJj5UNbaaY8R48I4Xb_dVCUfhj1AYiBLwfUfiuFR6jATrehlqANHHV694eIe7RLe_dAZvCaqsgpv2u1XRmrvNv3hZ-q1AcUXRurYmzi9NnUsdti6aStpq0q-k9z5L1ggzh6uli7yfYuI9QtG2kVy2lUJLb4OAshdZq1iK1qKsCBXrr70V0SWSJwDFwJRGkH40fMPXq6Ayqbk8WN83EtJ0xkPEGNk9PecxRBHYZE-idbwbOSkcGfsELsWUMyvlPh15ifaAJg4CdPKD15oEGyEmiftmtM-12WnckiQ")
                    .field(blogUpdate)
                    .attach("image", "C:/Users/Patience/Andela/AndelaBrand/My-Brand/UI/images/agyle.jpg")
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
        const blogIdUpdate = "5f713aff993abe2d308e2c96"
        it("It should return 401 status code", (done) => {
            chai.request(server)
                .patch(`/api/blogs/${blogIdUpdate}`)
                .field(blogUpdate)
                .attach("image", "C:/Users/Patience/Andela/AndelaBrand/My-Brand/UI/images/agyle.jpg")
                .type("form")
                .end((error, response) => {
                    if (error) return done(error)
                    response.should.have.status(401);
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