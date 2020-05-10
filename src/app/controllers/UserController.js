const User       = require("../model/User");
const RecipeFile = require("../model/RecipeFile");
const Recipe     = require("../model/Recipe");
const crypto     = require("crypto");
const { hash }   = require("bcryptjs");
const mailer     = require("../../lib/mailer");

module.exports = {
    registerForm(req, res) {
        return res.render("admin/users/register");
    },

    async index(req, res) {
        const results = await User.all();
        const users = results.rows;

        return res.render("admin/users/users.njk", { users });
    },

    async show(req, res) {
        const { user } = req;

        return res.render("admin/users/edit.njk", { user });
    },

    async post(req, res) {
        try {
            let isAdmin = false;
            if(req.body.isAdmin) {
                isAdmin = true;
            }

            let passwordSend = crypto.randomBytes(3).toString("hex");
            console.log(passwordSend);
            
            const password = await hash(passwordSend, 8);

            console.log(password);
        
            let values = [
                req.body.name,
                req.body.email,
                password,
                isAdmin
            ];

            const results = await User.create(values);
            await mailer.sendMail({
                to: req.body.email,
                from: "no-replay@foodfy.com.br",
                subject: "Cadastro de Usuário",
                html: `
                    <h2>Seu usário foi criado</h2>
                    <p>Login: ${ req.body.email }</p>
                    <p>Senha: ${ passwordSend }</p>
                `
            });

            const userId = results.rows[0].id;
            return res.redirect("/admin/users");
        }
        catch(err) {
            console.error(err);
        }        
    },

    async update(req, res) {
        try {
            const {id, name, email } = req.body;

            await User.update(id ,{ name, email });

            return res.render("admin/users/edit", {
                user: req.body,
                success: "Usuário atualizado com sucesso!"
            });
        }
        catch(err) {
            console.error(err);
            return res.render("admin/users/edit", {
                error: "Algum erro aconteceu!"
            });
        }
    },

    async delete(req, res) {
        try {
            await User.delete(req.body.id);

            const results = await User.all();
            const users = results.rows

            return res.render("admin/users/users", {
                users: users,
                success: "Conta deletada com sucesso!"
            });
        }
        catch(err) {
            console.error(err);
        }
    },

    async account(req, res) {
        const id = req.session.userId;
        const user = await User.findOne({ where: { id } });
        res.render("admin/users/account", { user });
    }
}