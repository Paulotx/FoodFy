const User = require("../model/User");
const { compare } = require("bcryptjs");

function checkAllFiels(body) {
    const keys = Object.keys(body);

    for(key of keys) {
        if(body[key] == "") {
            return {
                user: body,
                error: "Por favor, preencha todos os campos!"
            }
        }      
    }
}

async function post(req, res, next) {
    const fillAllFields = checkAllFiels(req.body);
    
    if(fillAllFields) {
        return res.render("admin/users/register", fillAllFields);
    }

    //check if user exists [email]
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if(user) return res.render("admin/users/register", {
        user: req.body,
        error: "Usuário já cadastrado!"
    });

    next();
}

async function show(req, res, next) {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });

    if(!user) {
        return res.send("Usuario não encontrado!");
    }

    req.user = user;

    next();
}

async function update(req, res, next) {
    const fillAllFields = checkAllFiels(req.body);

    if(fillAllFields) {
        return res.render(`admin/users/edit`, fillAllFields);
    }

    const { id, email, password } = req.body;

    const user   = await User.findOne({ where: { id }});
    const passed = await compare(password, user.password);

    if(!passed) {
        return res.render(`admin/users/edit`, {
            user: req.body,
            error_login: "Senha incorreta!"
        });
    }

    next();
}

async function edit(req, res, next) {
    const fillAllFields = checkAllFiels(req.body);

    if(fillAllFields) {
        return res.render(`admin/users/edit`, fillAllFields);
    }

    next();
}

async function remove(req, res, next) {
    const results = await User.all();
    const users = results.rows

    if(req.session.userId == req.body.id)
        return res.render("admin/users/users",  {
            users: users,
            error: "Você não pode excluir o seu próprio usuário!"
        });

    next();
}

module.exports = {
    post,
    show,
    update,
    edit,
    remove
}