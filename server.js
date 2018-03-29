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
    name:{
        type: String,
        required: [true, "Name required"],
        minlength: [3, "Back to the future"],
    },
    review:[{
        name:{
            type: String,
            required: [true, "Your name required"],
            minlength: [3, "Your name isn't as short as mine"],
        },
        desc:{
            type: String,
            required: [true, "Description required"],
            minlength: [3, "Describe movie more"]
        },
        star:{
            type: Number,
            default: 0
        },
    }]
}, {timestamps: true})

// create the actual model
mongoose.model('Bbelt', BlackSchema); 
var Black = mongoose.model('Bbelt')
mongoose.Promise = global.Promise;

// get all
app.get('/movie', function(req, res){
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
app.get('/movie/:id', function(req,res){
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
app.post("/movie", function(req,res){
    let add = new Black();
    // console.log(req.body)
    Black.findOne({name:req.body.name}, function(err,data){
        if(data){
            res.json({message: "Exsist", data:{errors:{exsist:"Already exsists"}}})
        }else{
            add.name = req.body.name
            console.log(req.body)
            add.review.push({name:req.body.yourname, desc:req.body.desc, star:req.body.stars})
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
app.delete('/movie/delete/:id', function(req,res){
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
app.get('/movie/add/:id', function(req,res){
    Black.update({_id:req.params.id}, {$inc:{likes : 1 }}, function(err,data){
        if(err){
            console.log(err)
            res.status(418).send(err)
        }else{
            res.json(data)
        }
    })
})

// del review 
app.post('/movie/delete/review/:id',function(req,res){
    Black.update({_id:req.params.id},{$pull:{review:{_id:req.body.thing}}}, function(err, data){
      if(err){
        console.log(err)
        res.status(418).send(err)
      }else{
        res.json(data)
      }
    })
  })

// add review

app.post('/movie/review/:id', function(req,res){
    console.log(req.body)
    Black.findOne({_id:req.params.id}, function(err, data){
      if(err){
        res.status(418).send(err)
      }else{
        data.review.push({name:req.body.yourname, desc:req.body.desc, star:req.body.stars})
        data.save(function(err,data){
          if(err){
          res.json({message: "Error", data:err})
          }else{
          console.log(data)
          res.json({message: "Safe", data:data})}
        })
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
  