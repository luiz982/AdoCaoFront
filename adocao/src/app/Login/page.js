'use client'
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading'
import '../Login/style.css'
import logoAdasfa from '../../assets/logo.png'
import Usuario from '@/service/UsuarioService';


export default function Login() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usuario = new Usuario();

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setLoading(true)
        await usuario.Login(username, password).then((response) => {
            if(response.status == 200){
                router.push('/Principal')
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Usuário ou senha inválidos.',
                    confirmButtonText: 'Ok'
                });
            }
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Falha ao realizar o login, por favor, tente novamente.',
                confirmButtonText: 'Ok'
            });
        })
        .finally(() => {
            setLoading(false)
        })
    };


    return (
        <Page isLogin>
            <div className='divLogin text-center vh-100'>
                <div className="d-flex justify-content-center align-items-center">
                    <Image src={logoAdasfa} width={175} height={175} style={{ marginTop: '15vh' }} alt="Logo da ADASFA"></Image>
                </div>
                <h2 id="" className="form-text text-center">Por favor, entre com suas credenciais</h2>
                <hr className='form linha mx-auto'></hr>
                <div className='container'>
                <form onSubmit={handleSubmit}>
                        <div className="mb-3 mx-auto credenciais">
                            <label htmlFor="username" className="form-label">Usuário</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        <div className="mb-3 mx-auto credenciais">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input 
                                type="password" 
                                className="form-control maxw-lg" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary botao mb-3">
                            {isLoading ? (
                                <div className='d-flex justify-content-center align-items-center'>
                                    <ReactLoading className='text-center' type={'spin'} color={'white'} height={'28px'} width={'30px'} />
                                </div>
                            ) : (
                                <>Login</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </Page>
    );
}