import api, {services} from "@/service/connection";

export default class Animal {
    BuscarAnimaisNaoAdotados= async () => {
        try {
            let response = await api.get(`${services.animal.buscarAnimaisNaoAdotados}`);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

    BuscarAnimalEspecifico= async (id) => {
        try {
            let response = await api.get(`${services.animal.buscarAnimalEspecifico}/${id}`);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }


    CadastrarAnimal = async (animal) => {
        try {
        console.log('data', animal)
            let response = await api.post(`${services.animal.cadastrarAnimal}`, animal);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

    AlterarAnimal = async (id, animal) => {
        try {
            let response = await api.put(`${services.animal.alterarAnimal}/${id}`, animal);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

    DeletarAnimal = async (id) => {
        try {
            let response = await api.delete(`${services.animal.deletarAnimal}/${id}`);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }
}