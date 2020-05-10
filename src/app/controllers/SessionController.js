const User     = require("../model/User");
const crypto   = require("crypto");
const mailer   = require("../../lib/mailer");
const { hash } = require("bcryptjs");

module.exports = {
    loginForm(req, res) {
        res.render("session/login"); 
    },

    login(req, res) {
        req.session.userId = req.user.id;

        return res.redirect(`/account`);
    },

    logout(req, res) {
        req.session.destroy();

        return res.redirect("/login");
    },

    forgotForm(req, res) {
        return res.render("session/forgot-password");
    },

    async forgot(req, res) {
        try {
            const user = req.user;

            const token = crypto.randomBytes(20).toString("hex");

            let now = new Date();
            now = now.setHours(now.getHours() + 1);

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            });

            await mailer.sendMail({
                to: user.email,
                from: "no-replay@foodfy.com.br",
                subject: "Recuperação de Senha?",
                html: `
                    <h2>Perdeu a chave</h2>
                    <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
                    <p>
                        <a href="http://localhost:3000/reset-password?token=${ token }" target="_blank">
                            RECUPERAR SENHA
                        </a>
                    </p>
                `
            });

            return res.render("session/forgot-password", {
                succes_forgot: "Verifique seu email para recuperar sue senha!"
            });
        }
        catch(err) {
            console.error(err);
            return res.render("session/forgot-password", {
                error_login: "Erro inesperado, tente novamente!"
            });
        }
    },

    resetForm(req, res) {
        return res.render("session/reset-password", { token: req.query.token });
    },

    async reset(req, res) {
        const { password } = req.body;
        const user = req.user;

        try {
            const newPassword = await hash(password, 8);

            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            });

            return res.render("session/login", {
                user: req.body,
                succes_forgot: "Senha atualizada! Faça seu login"
            });
        } 
        catch (err) {
            console.error(err);
            return res.render("session/reset-password", {
                error_login: "Erro inesperado, tente novamente!"
            });
        }
    }
}