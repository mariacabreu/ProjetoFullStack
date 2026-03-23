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

//Definição das rotas da API
app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.findAll()
    res.json(clientes)
})

app.post('/clientes', async (req, res) => {
    try {
        const { nome, email, telefone } = req.body
        const novoCliente = await Cliente.create({ nome, email, telefone })
        res.status(201).json({ message: 'Cliente criado com sucesso', cliente: novoCliente })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.put('/clientes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email, telefone } = req.body

        const [updated] = await Cliente.update(
            { nome, email, telefone },
            { where: { id:  id } })

        if (updated) {
            const clienteAtualizado = await Cliente.findByPk(id)
            return res.status(200).json({
                message: 'Cliente atualizado com sucesso',
                cliente: clienteAtualizado
            })
        }
        return res.status(404).json({ message: 'Cliente não encontrado' })
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar cliente" })
    }
})

app.delete('/clientes/:id', async (req, res) => {
    try{
        const { id } = req.params
        const deletado = await Cliente.destroy({
            where: { id: id }
        })
        if (deletado) {
            return res.status(200).json({ message: 'Cliente deletado com sucesso' })
        }

        return res.status(404).json({ message: 'Cliente não encontrado' })
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao deletar cliente" })
    }
})

//Iniciando o servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`)
        console.log(`✅ Banco de dados conectado`)
    })
}).catch(error => {
    console.error('❌ Erro ao conectar com o banco de dados:', error)
})