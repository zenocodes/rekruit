const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const multer = require('multer')
const session = require('express-session')

const app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rekruit'
})


const upload = multer({dest: 'public/uploads/'})
const uploadBlogImages = multer({dest: 'public/blogImages/'})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'siriyawatatu',
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login', {title: 'Log In'})
})

app.post('/login', (req, res) => {

})

app.get('/signup', (req, res) => {
    res.render('signup', {title: 'Sign Up'})
})

app.post('/signup', (req, res) => {
    
})

// blog section

const images = []

app.get('/create-post', (req, res) => {

    if(req.session.images){
        res.render('create-post', {images: req.session.images})
    } else {
        res.render('create-post', {images: images})
    }
})

app.post('/create-post', (req, res) => {
    const post = {
        title: req.body.title,
        body: req.body.content,
        author: 'Admin'
    }
    connection.query(
        'INSERT INTO posts (title, body, author) VALUES (?,?,?)',
        [post.title, post.body, post.author],
        (error, results) => {
            console.log('posted created successfully')
        }
    )
})

app.post('/upload-images', uploadBlogImages.array('blogImage', 10), (req, res) => {
    req.files.forEach(image => {
        images.push(image.filename)        
    });
    req.session.images = images
    res.redirect('/create-post')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server up. app running...')
})