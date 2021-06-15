const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flash = require('flash')

const app = express()
const PORT = 8081

var isFirst = true 

var validateEmail = {
	class: '',
	value: ''
}

var validatePassword = {
	class: [
 		'',
 		''
	],
	value: ''
}

// Config

	// HandleBars -> setando handlebars como view engine
	app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
	app.set('view engine', 'handlebars')

	// Body parser
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	// Express session
	app.use(expressSession({
		secret: '123',
		resave: true, 
		saveUninitialized: true,
		cookie: { maxAge: 60000 }
	}))

	// Cookie session
	app.use(cookieParser('123'))

	// Flash
	app.use(flash())

	
// Rotas
app.get('/', (req, res) => {

	console.log(validatePassword)
	res.render('user/register', {
		validateEmail: validateEmail,
		validatePassword: validatePassword
	})
})



app.post('/val', (req, res) => {
	
	console.log('Validate route')
	setAll()

	var cloneEmail = validateEmail
	var clonePassword = validatePassword

	var { email, password } = req.body

	if (email == undefined || email == ''){
		validateEmail.class = 'text-danger'
	}

	if (password == undefined || password == ''){
		validatePassword.class[0] = 'text-danger'
	}

	if (password.length < 8){
		validatePassword.class[1] = 'text-danger'
	}

	validateEmail.value = email
	validatePassword.value = password

	res.redirect('/')
})

app.listen(PORT, () => {
	console.log('[SERVER] - App Status: [ONLINE]')
})


function setAll() {
	validateEmail.class = 'text-success'
	validatePassword.class[0] = 'text-success'
	validatePassword.class[1] = 'text-success'
}