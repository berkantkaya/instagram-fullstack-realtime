const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
fullname:{
    type:String,
    required:true,
    trim:true,
    maxlength:25
},
username:{
    type:String,
    required:true,
    trim:true,
    maxlength:25,
    unique:true
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true
},
password:{
    type:String,
    require:true
},
avatar:{
    type:String,
    default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZYdfjP_ndSFUrlBgevsIS2sj0vsrYkRpLTZFCCsPkfMLKcnNfq55EGdQkkIZ071hyBAA&usqp=CAU'
},
 role:{type:String,default:'user'},
 gender:{type:String,default:'male'},
 mobile:{type:String,default:''},
 address:{type:String,default:''},
 story:{type:String,default:'',maxlength:200},
 website:{type:String,default:''},
 followers:[{type:mongoose.Types.ObjectId,ref:'user'}],
 following:[{type:mongoose.Types.ObjectId,ref:'user'}],
 saved:[{type:mongoose.Types.ObjectId,ref:'user'}]
},{
    timestamps:true
})


module.exports=mongoose.model('user',userSchema)