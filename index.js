//   Ville Prittinen (t7prvi00) and Jukka Mäenpää (t9maju00) 

const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({dest: 'uploads'})
const port = 3000
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt.js');

app.use(bodyParser.json());

//test data
const posts = [
    {id: uuidv4(), postTitle: 'pelikone', price: 25, category:'Tietokoneet', location: 'Lahti', pickup: true, delivery: true},
    {id: uuidv4(), postTitle: 'läppäri', price: 300, category:'Tietokoneet', location: 'Helsinki', pickup: false, delivery: true},
    {id: uuidv4(), postTitle: 'HP kone', price: 55, category:'Tietokoneet', location: 'Helsinki', pickup: true, delivery: true},
    {id: uuidv4(), postTitle: 'Paras lapio', price: 4.50, category:'Työkalut', location: 'Oulu', pickup: false, delivery: true},
    {id: uuidv4(), postTitle: 'BMW Peugeot', price: 177, category:'Autot',location: 'Kuopio', pickup: true, delivery: true},
    {id: uuidv4(), postTitle: 'Audi', price: 25000, category:'Autot',location: 'Lahti', pickup: true, delivery: false},
    {id: uuidv4(), postTitle: 'Ruohonleikkuri', price: 2225,category:'Pihanhoito',location: 'Oulu', pickup: true, delivery: false},
    {id: uuidv4(), postTitle: 'Pensasakset', price: 33,category:'Pihanhoito',location: 'Helsinki', pickup: false, delivery: true,},
]
//GET REQUESTS
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/posts',(req,res) => {
    res.json(posts);
    console.log('this is GET all posts')
})

app.get('/posts/id/:id',(req,res) => {

    const id = posts.find(p => p.id === req.params.id);

    if(id === undefined){
        res.sendStatus(404)
    }else{
        res.json(id).sendStatus(200);
    }
    console.log('this is posts by post id')
})

// /posts/search?category=Autot 
app.get('/posts/categories/:category',(req,res) => {

    const category = posts.find( d => d.category === req.params.category)
    
    if(category == undefined){
        res.sendStatus(404)

    }else{
        res.json(category).sendStatus(200);
    }
    console.log('this is GET post by category')
})

app.get('/posts/locations/:location',(req,res) => {

    const location = posts.find(d => d.location === req.params.location)

    if(location == undefined){
        res.sendStatus(404)
    }else{
        res.json(location).sendStatus(200);
    }
    console.log('this is GET post by location')
})

app.get('/posts/dateofposting',(req,res) => {

    const dateOfPosting = posts.find(d => d.dateOfPosting === req.params.dateOfPosting)

    if(dateOfPosting == undefined){
        res.sendStatus(404)
    }else{
        res.json(dateOfPosting).sendStatus(200);
    }
    console.log('this is GET post by date of posting')
})

//PUT REQUESTS

app.put('/user/posts/id/:id',imageUpload, (req,res)=> {
    console.log('this is PUT for updating a specific post ')
    posts.put({postTitle: req.body.postTitle, 
        price: req.body.price, category: req.body.category, 
        location: req.body.location, pickup: req.body.pickup, 
        delivery: req.body.delivery, photos: req.files})
