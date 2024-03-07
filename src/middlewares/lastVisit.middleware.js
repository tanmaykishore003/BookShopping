export const setLastVisit = (req, res, next) => {
    if(req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString()
    }
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2*24*60*60*1000 //It sets the max age of the cookie to 2 days.
    })
    next();
}