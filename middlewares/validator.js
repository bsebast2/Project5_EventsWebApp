exports.validateId=(req,res,next)=>{
    let id = req.params.id;

    if(id.match(/^[0-9a-fA-F]{24}$/))
    return next();
    else{
        req.flash('error','You have used an invalid story ID');
        //return res.redirect('/users/profile');//profile page
        let err = new Error('You have used an invalid story ID');
        err.status = 400;
        return next(err);
    }


   // let id = req.params.id;

    ///if(!id.match(/^[0-9a-fA-F]{24}$/)) {
   //     let err = new Error('Invalid story id');
   //     err.status = 400;
   //     return next(err);
   // }
}