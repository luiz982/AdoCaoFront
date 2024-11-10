'use client';
import { useState, useEffect } from 'react';
import Page from '@/main/components/Page';
import './style.css';
import { useRouter } from 'next/navigation';
import Voluntario from '@/service/VoluntarioService';
import { Oval } from 'react-loader-spinner';
import Swal from 'sweetalert2';


export default function ListaVoluntarios() {
    const [voluntarios, setVoluntarios] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const voluntario = new Voluntario();

    async function fetchVoluntarios() {
        setLoading(true)
        await voluntario.BuscarVoluntarios().then((response) => {
            if(response.status == 200){
                setVoluntarios(response.data)
            }
        })
        .catch((err) => {
            // console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {      
        fetchVoluntarios();
    }, []);

    const formatarData = (dataISO) => {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); 
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };


    const handleDelete = async (id) => {
        Swal.fire({
            title: "Deseja Excluir?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Sim",
            denyButtonText: `Não`,
            confirmButtonColor: "rgba(0, 122, 255, 1)",
            width: "400px"
          }).then((result) => {
            if (result.isConfirmed) {
              deletarFuncionario(id)
            } 
          });
    }

    const deletarFuncionario = async (id) =>{
        await voluntario.DeletarVoluntario(id).then((response) => {
            if(response.status == 200){
                Swal.fire({
                    icon: "success",
                    text: "Usuário deletado com sucesso!",
                });
            }else{
                Swal.fire({
                    icon: "error",
                    text: "Erro ao deletar usuário!",
                });
            }
        })
        .catch((err) => {
            // console.log(err)
            Swal.fire({
                icon: "error",
                text: "Erro ao deletar usuário!",
            });
        })
        .finally(() => {
            fetchVoluntarios();
        })
    }


    return (
        <>
        <Page />
        <div className="container-voluntarios">
            <div className="container-coluna">
            <h2>Lista de Voluntários</h2>
            <button className="botao-cadastrar" type="button" onClick={() => router.push('/CadastrarVoluntario')}>
                Cadastrar Novo Voluntário
            </button>
            {
            loading ?
                    <>
                        <div className='d-flex justify-content-center align-items-center vh-25'>
                            <Oval
                                visible={true}
                                height="50"
                                width="50"
                                color="#0d6efd"
                                ariaLabel="oval-loading"
                                secondaryColor="#0d6efd"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    </>
                    :
                voluntarios.map(voluntario => (
                    <div key={voluntario.id} className="card-voluntario">
                        <div className="card-detalhes">
                            <h3>{voluntario.nome}</h3>
                            <p><strong>Data de Nascimento:</strong> {formatarData(voluntario.dataNascimento)}</p>
                            <p><strong>Telefone:</strong> {voluntario.tel}</p>
                            <p><strong>Email:</strong> {voluntario.email}</p>
                        </div>
                        <button className="botao-remover" onClick={() => handleDelete(voluntario.id)}>Remover</button>
                    </div>
                ))
            }
            </div>
        </div>
        </>
    );
}
