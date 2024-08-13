const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
//const enviarEmailRecovery = require("../helpers/email-recovery");

class UsuarioController {

    //GET /
    index(req, res, next) {
        Usuario.findById(req.payload.id).then(usuario => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next);
    }

    //GET /:id
    show(req, res, next) {
        Usuario.findById(req.params.id).populate({ path: "loja" })
            .then(usuario => {
                if (!usuario) return res.status(401).json({ errors: "Usuario não encontrado" });
                return res.json({
                    usuario: {
                        nome: usuario.nome,
                        email: usuario.email,
                        permissao: usuario.permissao,
                        loja: usuario.loja ? usuario.loja.nome : null
                    }
                });
            }).catch(next);
    }

    // POST /registrar
    store(req, res, next) {
        const { nome, email, password } = req.body;

        if (!nome ||!email ||!password) return res.status(422).json({ errors: { all: "Todos os campos são obrigatórios" } });

        const usuario = new Usuario({ nome, email });
        usuario.setSenha(password);

        usuario.save()
            .then(() => res.json({ usuario: usuario.enviarAuthJSON() }))
            .catch(next);
    }

    //PUT /
    update(req, res, next) {
        const { nome, email, password } = req.body;
        Usuario.findById(req.payload.id).then((usuario) => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não encontrado" });
            if (typeof nome !== "undefined") usuario.nome = nome;
            if (typeof email !== "undefined") usuario.email = email;
            if (typeof password !== "undefined") usuario.setSenha(password);

            return usuario.save().then(() => {
                return res.json({ usuario: usuario.enviarAuthJSON() });
            }).catch(next);
        }).catch(next);
    }

    //DELETE /
    remove(req, res, next) {
        Usuario.findById(req.payload.id).then(usuario => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não encontrado" });
            return usuario.remove().then(() => {
                return res.json({ deletado: true });
            }).catch(next);
        }).catch(next);
    }

    // POST /login
    login(req, res, next) {
        const { email, password } = req.body;
        if (!email) return res.status(422).json({ errors: { email: "não pode ficar vazio" } });
        if (!password) return res.status(422).json({ errors: { password: "não pode ficar vazio" } });
        Usuario.findOne({ email }).then(usuario => {
            if (!usuario) return res.status(401).json({ errors: "Usuário não registrado" });
            if (!usuario.validarSenha(password)) return res.status(401).json({ errors: "Senha inválida" });
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next);
    }

    // RECOVERY

    //GET /recuperar-senha
    showRecovery(req, res, next) {
        return res.render('recovery', { error: null, success: null });
    }

    //POST /recuperar-senha
    createRecovery(req, res, next) {
        const { email } = req.body;
        if (!email) return res.render('recovery', { error: "Preencha com o seu email", success: null });

        Usuario.findOne({ email }).then((usuario) => {
            if (!usuario) return res.render('recovery', { error: "Email não encontrado", success: null });
            const recoveryData = usuario.criarTokenRecuperacaoSenha();
            return usuario.save().then(() => {
                return res.render('recovery', { error: null, success: true });
            }).catch(next);
        }).catch(next);
    }

    // GET /recuperar-senha
    showCompleteRecovery(req, res, next) {
        if (!req.query.token) return res.render("recovery", { error: "Token não identificado", success: null });
        Usuario.findOne({ "recovery.token": req.query.token }).then((usuario) => {
            if (!usuario) return res.render("recovery", { error: "Token inválido", success: null });
            if (new Date(usuario.recovery.date) < new Date()) return res.render("recovery", { error: "Token expirado", success: null });
            return res.render("recovery/store", { error: null, success: null, token: req.query.token });
        }).catch(next);
    }

    // POST /recuperar-senha
    completeRecovery(req, res, next) {
        const { token, password } = req.body;
        if (!token || !password) return res.render("recovery/store", { error: "Preencha com a nova senha", success: null, token: token });
        Usuario.findOne({ "recovery.token": token }).then((usuario) => {
            if (!usuario) return res.render("recovery", { error: "Usuário não identificado", success: null });

            usuario.finalizarTokenRecuperacaoSenha();
            usuario.setSenha(password);
            return usuario.save().then(() => {
                return res.render("recovery/store", {
                    error: null, success: "Senha alterada com sucesso.",
                    token: null
                });
            }).catch(next);
        }).catch(next);
    }
}

module.exports = UsuarioController;