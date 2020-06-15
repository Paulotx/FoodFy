const { hash }   = require("bcryptjs");

const User = require("./src/app/model/User");

async function createUser() {
    
    const password = await hash("1111", 8);
    const user = [
        "User",
        "user@email.com",
        password,
        true
    ];

    const userId = await User.create(user);
}

createUser();