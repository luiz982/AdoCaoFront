'use client';
import { useState, useEffect } from 'react';
import Page from '@/main/components/Page';
import './style.css';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Oval } from 'react-loader-spinner';
import Adocao from '@/service/AdocaoService';

export default function HistoricoAdocoes() {
    const [adocoes, setAdocoes] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    var adocao = new Adocao;

    async function fetchAdocoes() {
        setLoading(true)
        await adocao.BuscarAdocao().then((response) => {
            console.log(response)
            if (response.status == 200) {
                setAdocoes(response.data)
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchAdocoes();
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
                deletarAdocao(id)
            }
        });
    }

    const deletarAdocao = async (id) => {
        await adocao.DeletarAdocao(id).then((response) => {
            if (response.status == 200) {
                Swal.fire({
                    icon: "success",
                    text: "Registro de adoção deletado com sucesso!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Erro ao deletar registro de adoção!",
                });
            }
        })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    text: "Erro ao deletar registro de adoção!",
                });
            })
            .finally(() => {
                fetchAdocoes();
            })
    }

    return (
        <>
            <Page />
            <div className="container-adocoes">
                <div className="container-coluna">
                    <h2>Histórico de Adoções</h2>
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
                            adocoes.map(adocao => (
                                <div key={adocao.id} className="card-adocao">
                                    <div className="card-detalhes">
                                        <h3>{adocao.animal.nome}</h3>
                                        <p><strong>Voluntário:</strong> {adocao.voluntario.nome}</p>
                                        <p><strong>Data da Adoção:</strong> {formatarData(adocao.dataAdocao)}</p>
                                        <p><strong>Adotante:</strong> {adocao.nomeAdotante}</p>
                                        <p><strong>CPF do Adotante:</strong> {adocao.cpfAdotante}</p>
                                        <p><strong>Telefone do Adotante:</strong> {adocao.telefoneAdotante}</p>
                                    </div>
                                    <button className="botao-remover" onClick={() => handleDelete(adocao.id)}>Remover</button>
                                </div>
                            ))}
                </div>
            </div>
        </>
    );
}
