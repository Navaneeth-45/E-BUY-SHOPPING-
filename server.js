const exp=require("express")
const mc=require("mongodb").MongoClient;
const app=exp()
const path = require("path")

//connect angular app with express server
app.use(exp.static(path.join(__dirname, './dist/SHOPPING/')))

const userApi=require("./APIS/user-api")

//execute apis based on the path
app.use("/user",userApi)



//connection string
const databaseUrl="mongodb+srv://navaneeth_45:navaneeth_45@cluster0.vbpsu.mongodb.net/mydb?retryWrites=true&w=majority"

let databaseObj;
let userCollectionObj;
//connect to db
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log('error in db connection',err)
    }
    else{
        // get database object
            databaseObj=client.db("mydb")
            //create usercollection obj
            userCollectionObj=databaseObj.collection("usercollection")
            app.set("userCollectionObj", userCollectionObj)
            let userCartCollectionObject = databaseObj.collection("usercartcollection")
            app.set("userCartCollectionObject", userCartCollectionObject)
            console.log(' connected to database')
    }
})



//invalid paths  error handling
app.use((req,res)=>{
 
    res.send({message:`path ${req.url} invalid`})
})

//error handling middleware synchronous
app.use((err,req,res,next)=>{
 
    res.send({message:`${err.message}`})
})

const port=4200;
app.listen(port,()=>console.log(`server listening on port ${port}`))