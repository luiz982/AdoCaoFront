import axios from "axios";

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    baseURL: 'http://localhost:8080/'
})


export const services = {

    usuario:{
        Login: 'usuario/Login'
    },
    voluntario:{
        buscarVoluntarios: 'voluntario',
        cadastrarVoluntario: 'voluntario',
        deletarVoluntario: 'voluntario'
    },
    adocao:{
        buscarAdocao: 'adocao',
        cadastrarAdocao: 'adocao',
        deletarAdocao: 'adocao'
    },
    animal:{
        buscarAnimais: 'animal',
        buscarAnimaisAdotados: 'animal/adotados',
        buscarAnimaisNaoAdotados: 'animal/naoadotados',
        cadastrarAnimal: 'animal',
        deletarAnimal: 'animal',
        alterarAnimal: 'animal',
        buscarAnimalEspecifico: 'animal'
    }
}

export default api;