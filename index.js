const express = require ('express')
const cors = require ('cors')
const { Sequelize, DataTypes } = require ('sequelize')

//Confriguração do banco de dados
const sequelize = new Sequelize ('project', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

//Definição do modelo de cliente
const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
    }
})

//Congiguração do servidor Express
const app = express()
app.use(cors()) //Permite o Front-end acessar a API
app.use(express.json()) //Permite o servidor entender requisições com JSON

const PORT = 3001