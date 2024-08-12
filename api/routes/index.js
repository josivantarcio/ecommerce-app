const router = require("express").Router();

// Configura o roteador para a API
router.use('/v1/api', require('./api/v1/'));

// Rota de verificação básica
router.get('/', (req, res, next) => res.send({ ok: true }));

// Middleware de tratamento de erros para erros de validação
router.use(function (err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function (errors, key) {
                errors[key] = err.errors[key.message];
                return errors;
            }, {})
        });
    }
    // Para outros tipos de erro, pode adicionar mais lógica aqui
});

module.exports = router;
