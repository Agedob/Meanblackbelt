var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var path = require('path');
app.use(express.static( __dirname + '/blackbeltApp/dist' ));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BLackBelt');

// set up belt schema
var BlackSchema = new mongoose.Schema({
    petname:{
        type: String,
        required: [true, "Name required"],
        minlength: [3, "Fill out full form"],
    },
    pettype: { 
        type: String,
        required:  [true, "Type required"],
        minlength: [3, "pet type to short..."]
    },
    description:{
        type: String,
        required:  [true, "Description required"],
        minlength: [3, "Describe your pet a little"]
    },
    skill: [{
        skill1:{type:String},
        skill2:{type:String},
        skill3:{type:String}
    }],
    likes:{
        type: Number,
        default: 0
    }
}, {timestamps: true})

// create the actual model
mongoose.model('Bbelt', BlackSchema); 
var Black = mongoose.model('Bbelt')
mongoose.Promise = global.Promise;

// get all
app.get('/pet', function(req, res){
    Black.find({}).sort({'petname':1}).exec(function(err, data){
        // always check and handle errors appropriately
        if(err){
            console.log(err);
            res.json({message: "Error", data: err})
        }else{
            res.json({message: "Success", data: data})
        }
    })
})

//get id
app.get('/pet/:id', function(req,res){
    Black.findOne({_id:req.params.id}, function(err,data){
        if(err){
            console.log(err)
            res.status(418).send(err)
        }else{
            res.json(data)
        }
    })
})

// add new pet
app.post("/pet", function(req,res){
    console.log(req.body)
    let add = new Black();
    // console.log(req.body)
    Black.findOne({petname:req.body.name}, function(err,data){
        if(data){
            res.json({message: "Exsist", data:{exsists:"Already exsists"}})
        }else{
            add.petname = req.body.name
            add.pettype = req.body.type
            add.description = req.body.desc
            add.skill.push({skill1:req.body.skill1, skill2:req.body.skill2, skill3:req.body.skill3})
            add.save(function(err,data){
                if(err){
                    console.log(err)
                    res.json({message: "Error", data:err})
                }else{
                    res.json({message: "Safe", data:data})
                }
            })

        }
    })
})

// dell..
app.delete('/pet/delete/:id', function(req,res){
    Black.remove({_id:req.params.id}, function(err,data){
        if(err){
            console.log(err)
            res.status(500).send(err)
        }else{
            res.json(data)
        }
    })
})

//add like Author.update({_id:req.params.id,'quote._id':req.body.qid}, {$inc:{"quote.$.vote":req.body.num}}, function(err, data){
app.get('/pet/add/:id', function(req,res){
    Black.update({_id:req.params.id}, {$inc:{likes : 1 }}, function(err,data){
        if(err){
            console.log(err)
            res.status(418).send(err)
        }else{
            res.json(data)
        }
    })
})
// wildcard catch all 
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./blackbeltApp/dist/index.html"))
  });
  
  app.listen(8000, function() {
      console.log("listening on port 8000");
  });
  