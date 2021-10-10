import axios from 'axios';

const apiClientes = axios.create({
    baseURL: 'http://localhost:8080/gerenciamento-cliente'
})

const apiEndereco = axios.create({
    baseURL: "http://localhost:8080/endereco"
})

export { apiClientes, apiEndereco }