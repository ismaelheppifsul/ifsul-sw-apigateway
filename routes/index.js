var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); //para usar a API
const SECRET = 'SW2019aluno';

/*carrega modulo do express-http-proxy*/
var httpProxy = require('express-http-proxy');

//inicializa o proxy para a URL base do microsserviço*
var livrariaProxy = httpProxy('https://sw6n1.herokuapp.com');

// PRIMEIRA API - Livros
// GET - retorna todos livros
router.get('/livros', (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  livrariaProxy( req, res, next );
});

// GET - retorna um  livro
router.get('/livros/:id', (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  livrariaProxy( req, res, next );
});

// POST - cria um livro
router.post('/livros', verificaToken, (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  livrariaProxy( req, res, next );
});

// UPDATE - atualiza um livro
router.put('/livros/:id', verificaToken, (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  livrariaProxy( req, res, next );
});

// DELETE - Deleta um livro
router.delete('/livros/:id', verificaToken, (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  livrariaProxy( req, res, next );
});

//#####################
//SEGUNDA API - Pedidos
//#####################

//inicializa o proxy para a URL base do microsserviço*
var pedidosProxy = httpProxy('');

// GET - retorna todos pedidos
router.get('/pedidos', verificaToken, (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  pedidosProxy( req, res, next );
});

// GET - retorna um  pedido
router.get('/pedidos/:id', verificaToken, (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  pedidosProxy( req, res, next );
});

// POST - cria um pedido
router.post('/pedidos', verificaToken, (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  pedidosProxy( req, res, next );
});

// UPDATE - atualiza um pedido
router.put('/pedidos/:id', verificaToken, (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  pedidosProxy( req, res, next );
});

// DELETE - Deleta um pedido
router.delete('/pedidos/:id', verificaToken, (req, res, next) => {
  req.originalUrl = '/api' + req.originalUrl;
  req.url = '/api' + req.url;
  pedidosProxy( req, res, next );
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function verificaToken(req, res, next) {
  //console.log('Aqui');
  var token = req.headers.authorization;
  if (!token)
    return res.status(401).send({ message: 'No token provided.' });

  jwt.verify(token, SECRET, function (err, decoded) {
    if (err)
      return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userData = decoded;
    next();
  });
}

router.post('/login', function (req, res) {

  console.log('login...');

  if (req.body.user === 'aluno' && req.body.pass === 'ifsul') {
    var payload = {
      user: req.body.user,
      role: 'admin',
      id: 1
    };

    var token = jwt.sign(payload, SECRET, { expiresIn: '3m' });
    res.status(200).send({ token: token });
  }else
    res.status(401).send({ user: 'user', pass: 'pass' });
});

module.exports = router;
