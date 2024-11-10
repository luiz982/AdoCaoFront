import api, {services} from "@/service/connection";

export default class Voluntario {
    BuscarVoluntarios = async () => {
        try {
            let response = await api.get(`${services.voluntario.buscarVoluntarios}`);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

    CadastrarVoluntario = async (voluntario) => {
        try {
            
            let response = await api.post(`${services.voluntario.cadastrarVoluntario}`, voluntario);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

    DeletarVoluntario = async (id) => {
        try {
            let response = await api.delete(`${services.voluntario.deletarVoluntario}/${id}`);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }
}