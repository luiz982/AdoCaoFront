import api, {services} from "@/service/connection";

export default class Usuario {
    Login = async (usuario, senha) => {
        try {
            let response = await api.post(`${services.usuario.Login}?usuario=${usuario}&senha=${senha}`);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

}