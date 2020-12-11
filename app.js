const express = require('express')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const User = require('./Models/User')
const passport = require('passport')
const app = express()

// passport module
require('./config/passport')(passport)

app.use(express.urlencoded({extended:false}))
app.use(expressLayouts)
app.set('view engine', 'ejs')



app.use(session({
	secret:'secret',
	resave:true,
	saveUninitialized:true,
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())
//Global variables/ middlewares
app.use((req,res,next)=>{
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	next();
})


app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server started on port ${PORT}`))