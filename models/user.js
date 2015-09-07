"use strict";

module.exports = function(sequelize, Datatypes){

    var User = sequelize.define("user",{
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return User;
};