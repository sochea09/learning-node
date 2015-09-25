module.exports = {
    userAuth: function(req, res, next){

    	if(req.headers.xauth == 'frank'){
    		next();
    	}else{
    		res.json('Authentication');
    	}
    }
}