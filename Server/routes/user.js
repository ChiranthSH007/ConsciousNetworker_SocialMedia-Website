const express= require('express');
const router=express.Router();
const User = require('./../model/schema')
const {OAuth2Client} = require('google-auth-library');
const { response } = require('express');

const client_id= '114967761590-cnoplbn3sqo1art2auetnuffsbeglloe.apps.googleusercontent.com';
const authClient=new OAuth2Client(client_id);
console.log(authClient);

router.post('/',(req,res)=>{
    const {idToken}=req.body;
    console.log(idToken);
    if(idToken){
        const{email_verified,email,name,picture}=response.payload;
        if(email_verified){
        User.findOne({email}).exec((err,user)=>{
            if(user){
                return res.json(user)
            }
            else{
                let password=email + clientId;
                let newUser = new User(email,name,picture,password);
                newUser.save((err,data)=>{
                    if(err){ return res.status.json({error:"mongodb error"})}
                    return res.json(data)
                })
             }
        })
    }}
})


module.exports = router;