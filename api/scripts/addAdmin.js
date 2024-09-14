const inquirer = require("inquirer");
const knex = require("knex");
const bcrypt = require("bcryptjs");


async function main() {
    const db = knex({
        client: "mysql",
        connection: {
            host: "localhost",
            port: 3306,
            database: "expense_tracker_db",
            user: "root"
        }
    });

    let { username, password } = await inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "Enter username"
        },
        {
            type: "password",
            name: "password",
            message: "Enter password"
        },
    ]);

    password = await bcrypt.hash(password, 10);

    db("tbl_admin").insert({ username, password })
        .then(value => {
            console.log("Admin registration successful");
            db.destroy();
        });
}

main();