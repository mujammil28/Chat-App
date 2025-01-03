export const auth=(req,res,next)=>{

 try{   if(req.session.email){
        next();
    }}catch(err){

        res.redirect('/login')
    }
}