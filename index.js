const express = require ('express')
const cors = require ('cors')
const { Sequelize, DataTypes } = require ('sequelize')

//Confriguração do banco de dados
const sequelize = new Sequelize ('db_projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
