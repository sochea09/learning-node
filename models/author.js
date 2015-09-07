var Sequelize = require('sequelize');
var db = new Sequelize('learning_node', "root", "root", {
    dialect: 'mysql'
})

var Author = db.define('author', {

    firstName: {
        type: Sequelize.STRING
    },

    lastName: {
        type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
            contains: {
                args: '@bar.com',
                msg: 'Must use bar.com email.'
            }
        }
    },

    birthMonth: {
        type: Sequelize.INTEGER,
        validate: {
            max: 12,
            min: 1
        }
    },

    birthDay: {
        type: Sequelize.INTEGER,
        validate: {
            max: 31,
            min: 1,
            maxDay: function(value) {
                if (!this.birthMonth) return
                var counts = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                if (value > counts[this.birthMonth-1])
                    throw new Error('birthDay out of range.')
            }
        }
    }
}, {
    validate: {
        notAnonymous: function() {
            if (this.firstName == null
                && this.lastName == null
                && this.email == null) {
                throw new Error('Author cannot be anonymous.')
            }
        }
    }
})

Author.sync({ force: true }).then(function() {
    Author.create({
        firstName: 'Mike',
        lastName: 'Frey',
        email: 'foo@bar.com',
        birthMonth: 4,
        birthDay: 30
    })
        .then(function(author) {
            logSuccess('Record created successfully!')
        })
        .catch(function(err) {
            logError(err.message)
        })
        .finally(process.exit)
})


function logSuccess(msg) {
    console.log('\n\033[32m', msg, '\033[0m\n')
}
function logError(msg) {
    console.log('\n\033[31m', msg, '\033[0m\n')
}