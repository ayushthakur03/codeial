module.exports.profile= function(req,res){
    res.send('<h1>Profile in users </h1>');
}

module.exports.like= function(req,res){
    res.send('<h1>Like in users </h1>');
}

module.exports.default= function(req,res){
    res.send('<h1>Users biatchhh </h1>');
}

module.exports.signin= function(req,res){
    return res.render('sign_in',{
        title:'Sign-in'
});
}

module.exports.sign_up= function(req,res){
    return res.render('sign_up',{
        title:'Sign-up'
});
}

module.exports.create= function(req,res)
{
    //later
}
module.exports.createSession= function(req,res)
{
    //later
}