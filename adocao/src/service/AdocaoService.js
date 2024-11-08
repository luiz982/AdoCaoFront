import api, {services} from "@/service/connection";

export default class Adocao {
    BuscarAdocao = async () => {
        try {
            let response = await api.get(`${services.adocao.buscarAdocao}`);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

    CadastrarAdocao = async (adocao) => {
        try {
            console.log('data', adocao)
            let response = await api.post(`${services.adocao.cadastrarAdocao}`, adocao);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

    DeletarAdocao = async (id) => {
        try {
            let response = await api.delete(`${services.adocao.deletarAdocao}/${id}`);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }
}