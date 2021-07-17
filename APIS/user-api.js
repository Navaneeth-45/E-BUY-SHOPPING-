//create mini express app
const exp=require("express")
const userApi=exp.Router()

//add body parse
userApi.use(exp.json())
const errorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
//import cloudinary modules
const cloudinary=require("cloudinary").v2;
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const { consoleTestResultHandler } = require("tslint/lib/test")
require("dotenv").config()

//configure cloudinary
cloudinary.config({
    cloud_name:'de630mvhf',
    api_key:'688281549995921',
    api_secret:'91R8rr1hetWn6UgtxDiELS8VFUE'
})


//configure multer-storage-cloudinary
 const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
     return{
        folder:"navaneeth",
        public_id:file.filename+'-'+Date.now()
     }

    }
})
//configure multer
const multerObj=multer({storage:clStorage})




//sample route user/getusers (using callback function)

/*userApi.get('/getusers',(req,res,next)=>{
   // read docs from usercollection
    userCollectionObj.find().toArray((err,usersList)=>{
        if(err){
            console.log("err in reading users data:",err)
            res.send({message:err.message})
        }
        else{
            
            res.send({message:usersList})
        }
    })
    
})*/

//using promise (get users)

/* userApi.get('/getusers',(req,res,next)=>{
   
    userCollectionObj.find().toArray()
    .then(userList=>{res.send({message:userList})})
    .catch(err=>{
        console.log("err in get users",err)
        res.send({message:err.message})
    })

}) */


//using await async (get users)

userApi.get('/getusers',errorHandler(async (req,res)=>{
    let  userCollectionObj=req.app.get("userCollectionObj")
   
    let userList= await userCollectionObj.find().toArray()
    res.send({message:userList})
   

}))




//get by username user?getuser/<username>
/* userApi.get('/getusers/:username',(req,res,next)=>{
   //get username from params
   let un=req.params.username;
   userCollectionObj.findOne({username:un},(err,userObj)=>{
    if(err){
        console.log("err in reading users data:",err)
        res.send({message:err.message})
    }
    if(userObj===null){
        res.send({message:"user not found"})
    }
    else{
        res.send({message:userObj})
    }

   })
    
}) */


//get user by username (using async and await)

userApi.get('/getusers/:username', errorHandler(async (req,res,next)=>{
    let  userCollectionObj=req.app.get("userCollectionObj")
    //get username from params
    let un=req.params.username;
    let userObj= await  userCollectionObj.findOne({username:un})
    if(userObj===null){
        res.send({message:"user not found"})
    }
    else{
        res.send({message:userObj})
    }


}))




/*userApi.post('/createuser',(req,res,next)=>{
    
    //get user obj
    let newUser=req.body;
    //check user in db with this username
    userCollectionObj.findOne({username:newUser.username},(err,userObj)=>{
        if(err){
            console.log("err in creating user:",err)
            res.send({message:err.message})
        }
        //if user not existed

        if(userObj===null){
            //create new user
            userCollectionObj.insertOne(newUser,(err,success)=>{
                if(err){
                       res.send({message:err})
                }
                else{
                    res.send({message:"new user created"})
                }
            })

        }
        else{
            res.send({message:"user already existed"})
        }

    })
 })
 */


//create user using (async and await)

//create user
//http://localhost:3000/user/createuser
//create user
userApi.post("/createuser", errorHandler(async (req, res, next) => {

    let userCollectionObj = req.app.get("userCollectionObj")

    //get user obj
    let newUser = req.body

    //search for existing user
    let user = await userCollectionObj.findOne({ username: newUser.username })
    //if user existed
    if (user=='undefined') {
        res.send({ message:"User already existed"});
    }
    else {
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password
        newUser.password = hashedPassword;
        //insert
        await userCollectionObj.insertOne(newUser)
        res.send({ message:"User created"})
    }
}))




 //update user
 userApi.put('/updateuser/:username',(req,res,next)=>{
    let  userCollectionObj=req.app.get("userCollectionObj")
     let modifiedUser=req.body;

     //update
     userCollectionObj.updateOne({username:modifiedUser.username},{
         $set:{ ... modifiedUser}},(err,success)=>{
             
            if(err){
                console.log("err in update user:",err)
                res.send({message:err.message})
            }
            else{
                res.send({message:"user details updated"})
            }
         })

   
     
 })

//delete user using (async and await)
userApi.delete("/deleteuser/:username",errorHandler(async (req,res)=>{
    let  userCollectionObj=req.app.get("userCollectionObj")
    let un=req.params.username;
    let user=await userCollectionObj.findOne({username:un})
    if(user==null){
        res.send({message:"user not existed"})

    }
    else{
        await  userCollectionObj.deleteOne({username:un})
        res.send({message:"user deleted"})

    }

}))


//user login
userApi.post("/login",errorHandler(async (req,res)=>{
    let  userCollectionObj=req.app.get("userCollectionObj")

    let credentials=req.body;
    //serach user by username
    let user=await userCollectionObj.findOne({username:credentials.username})
    if(user===null){
        res.send({message:"user not existed"})
    }
    else{
       let result= await bcryptjs.compare(credentials.password,user.password)
       //if not matched
       if(result===false){
        res.send({message:"invalid password"})
       }
       else{
           //create token
           let signedToken= jwt.sign({username:credentials.username},process.env.SECRET,{expiresIn:10})
           //send token to client
           res.send({message:"login success", token: signedToken, username:credentials.username,userObj:user})
       }

    }

}))



//add to cart
userApi.post("/add-to-cart", errorHandler(async (req, res, next) => {

    let userCartCollectionObject = req.app.get("userCartCollectionObject")

    let newProdObject = req.body;
    //console.log(newProdObject)

    
    //find usercartcollection 
    let userCartObj = await userCartCollectionObject.findOne({username:newProdObject.username})

    //console.log(userCartObj)

    //if userCartObj is not existed
    if (newProdObject.username===null){
        res.send({message:"Login Required"})
}

    else if (userCartObj === undefined) {

        //create new object
        let products = [];

        products.push(newProdObject.productObject)

        let newUserCartObject = { username:newProdObject.username, products }

        //insert it
        await userCartCollectionObject.insertOne(newUserCartObject)

        let latestCartObj = await userCartCollectionObject.findOne({ username:newProdObject.username })
        res.send({ message: "New product Added", latestCartObj: latestCartObj })

    }
    //if existed
    else {
        //push productObject to products array
        userCartObj.products.push(newProdObject.productObject)
        //update document
        await userCartCollectionObject.updateOne({ username: newProdObject.username }, { $set: { ...userCartObj } })
        let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
        res.send({ message: "New product Added", latestCartObj: latestCartObj })
    }

}))


//get products from user cart
userApi.get("/getproducts/:username", errorHandler(async (req, res, next) => {

    let userCartCollectionObject = req.app.get("userCartCollectionObject")

    let un = req.params.username;

    let userProdObj = await userCartCollectionObject.findOne({ username: un })

    if (userProdObj === null) {
        res.send({ message: "Cart-empty" })
    }
    else {
        res.send({ message: userProdObj })
    }


}))









//export
module.exports=userApi