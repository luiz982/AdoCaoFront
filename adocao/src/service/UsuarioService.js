import api, {services} from "@/service/connection";

export default class Usuario {
    Login = async (usuario) => {
        try {
            let response = await api.post(`${services.usuario.Login}`, usuario);

            return response;
        } catch (ex) {
            return ex.response;
        }
    }

}