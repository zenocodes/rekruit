const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')

const app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rekruit'
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server up. app running...')
})