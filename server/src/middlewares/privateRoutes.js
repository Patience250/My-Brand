module.exports.hasToken = (passport) => {
    return passport.authenticate('jwt', { session: false })
}