const transporter = require("nodemailer").createTransport(require("../config/email"));
const { root: link } = require("../config/index");

module.exports = ({ usuario, recovery }, cb) => {
    const message = `
        <h1 style="text-align: center;">Recuperação de Senha</h1>
        <br />
        <p>
        Aqui está o link para redefinir a sua senha. 
        Acesse ele e digite sua nova senha:
        </p>
        <a href="${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}">
        ${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}
        </a>
        <br /><br /><hr />
        <p>Caso você não tenha solicitado esta recuperação de senha, ignore este email.</p>
        <p>Este é um email automático, não responda a ele.</p>
        <br />
        <p>Atenciosamente, Loja Teste</p>
    `;

    const opcoesEmail = {
        from: "Loja Teste <noreply@example.com>",
        to: usuario.email,
        subject: "Recuperação de Senha",
        html: message
    };

    if (process.env.NODE_ENV === "production") {
        transporter.sendMail(opcoesEmail, (error, info) => {
            if (error) {
                console.log(error);
                return cb("Aconteceu um erro no envio do email, tente novamente.");
            } else {
                return cb(null, "Link para redefinaco de senha enviado com sucesso para o seu email!");
            }
        });
    } else {
        console.log(opcoesEmail);
        return cb(null, "Link para redefinir a senha enviado com sucesso para o seu email!");
    }
};