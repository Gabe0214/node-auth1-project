const router = require('express').Router()
const UserDB = require('./auth-modal')

const bcrypt = require('bcryptjs')



router.post('/register', (req, res) => {

const { username, password } = req.body
  
UserDB.insert({ username, password: bcrypt.hashSync(password, 8)})

   .then(id=> {
    //    console.log(user)
    res.status(200).json({ message: 'user registered', id})
   })
   .catch(err => {
       console.log(err)
       res.status(500).json({message: "sorry"})
   })
})



router.post('/login', (req, res) => {

    const { username, password } = req.body
      
    UserDB.findByUsername(username)
    
       .then(user=> {
        //    console.log(user)
        if(user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({ message: 'You are logged in'})
        }  else {
            res.status(401).json({message: "invalid username and/or password"})
        }
       })
       .catch(err => {
           console.log(err)
           res.status(500).json({message: "sorry"})
       })
    })



router.get('/users', restrict, (req, res) => {
    UserDB.get()
    .then(users => {
        res.status(201).json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "sorry"})
    })
})


//middleware 

function restrict(req, res, next){
 
        if(req.session && req.session.user) {
            console.log(req.session)
            next();
        } else {
            console.log(req.session)
            res.status(401).json({message: "Not authorized"})
        }
    }
   


module.exports = router;