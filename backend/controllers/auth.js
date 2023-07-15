const userdetails = require('../models/user')

exports.registerfunction = async (req, res) =>{
    const {name,email,password,cpassword} = req.body;
        console.log(req.body)
        const exist = await userdetails.find({email});
        console.log(exist)
        if(exist.length>0)
        {
          return res.json({"message":"User already exists"})
        }
        else
        {
         const data = new userdetails({
              email:email,
              name:name,
              password:password,
              cpassword:cpassword
            })
            await data.save().then((r)=>{
                return res.send({"message":"Registration Successful"})
            })
            .catch((err)=>{
              console.log(err)
            })
        }

    
}
exports.loginfunction = async (req, res) =>{
    const {email,password} = req.body;
    const exist = userdetails.findOne({email},(err,data)=>{
      if(data==null)
      {
         return res.json({"message":"User Not Found"})
      }
      if(data.password!=password)
      {
        return res.json({"message":"Incorrect Password"});
      }
      return res.json({"message":"login successful"});
    })   
}