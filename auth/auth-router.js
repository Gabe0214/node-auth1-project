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
    .then(list => {
        res.status(201).json(list)
    })
    .catch(err => {
        res.status(500).json({error: "sorry"})
    })
})


//middleware 

function restrict(req, res, next){
    const { username, password } = req.headers
    UserDB.findByUsername(username)
    .then( user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            next();
        } else {
            res.status(403).json({message: "Not authorized"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error registering user"})
        })
}


module.exports = router;