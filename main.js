//load libraries
const express = require('express')
const handlebars = require('express-handlebars')

//configure the environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

//create an instance of express
const app = express()

//configure handlebars with express
app.engine('hbs',
    handlebars({ defaultLayout: 'main.hbs'})
)
app.set('view engine', 'hbs')

/*logging
app.use(
    (req,resp,next)=> {
        console.info(`${new Date()}: ${req.method} ${req.originalUrl}`)
        next()
    }
)
*/

//respond to Get/ the landing page
app.get('/',
    (req, resp)=>{
        resp.status(200)
        resp.type('text/html')
        resp.render('home')
        
    }
)

//function for generating dice
function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max))+1);
  }

const dice_images = ['','/1.png','/2.png','/3.png','/4.png','/5.png','/6.png',]


//after rolling dices (2 dices)
app.get('/roll',
    (req,resp)=>{
        const d1 = dice_images[getRandomInt(6)]
        const d2 = dice_images[getRandomInt(6)]
        resp.status(200)
        resp.type('text/html')
        resp.render('roll',
        {
            dice1: d1,
            dice2: d2
        }
        )
    }
)

//continue to search other directory

app.use(
    express.static(__dirname + '/dice_images')
)
app.use(
    express.static(__dirname + '/views')
)

//if input not found
app.use(
    (req,resp)=>{
        resp.status(404)
        resp.type('text/html')
        resp.send(`ERROR 404 NOT FOUND!`)
    }
)

// start express
app.listen(
    PORT,       //port number   
    function() { //callback, execute after express has started
        console.info(`Application started on port ${PORT} at ${new Date()}`)
            })