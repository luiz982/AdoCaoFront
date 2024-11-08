'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Page from '@/main/components/Page';
import '../CadastrarAdocao/style.css';
import Adocao from '@/service/AdocaoService';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import Animal from '@/service/AnimalService';
import { Oval } from 'react-loader-spinner';
import Voluntario from '@/service/VoluntarioService';

export default function CadastrarAdocao() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        animalId: '',
        nomeAnimal: '',
        voluntarioId: '',
        dataAdocao: new Date().toISOString().split('T')[0],
        nomeAdotante: '',
        cpfAdotante: '',
        telAdotante: ''
    });
    const [voluntarios, setVoluntarios] = useState([])

    const adocaoService = new Adocao();
    const animalService = new Animal();
    const voluntarioService = new Voluntario();

    useEffect(() => {
        if (!id) {
            router.push('/Animais');
        } else {
            animalService.BuscarAnimalEspecifico(id)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        const animalData = response.data;
                        setFormData(prevData => ({
                            ...prevData,
                            animalId: id,
                            nomeAnimal: animalData.nome,
                        }));
                        carregarVoluntarios();  
                    } else {
                        Swal.fire({
                            icon: "error",
                            text: "Erro ao encontrar animal!",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                router.push('/Animais');
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        text: "Erro ao encontrar animal!",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push('/Animais');
                        }
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id, router]);
    
    const carregarVoluntarios = async () => {
        await voluntarioService.BuscarVoluntarios()
            .then((response) => {
                console.log('voluntarios', response);
                if (response.status === 200) {
                    const fetchedVolunteers = response.data;
                    setVoluntarios(fetchedVolunteers);
    
                    if (fetchedVolunteers.length > 0) {
                        setFormData(prevData => ({
                            ...prevData,
                            voluntarioId: fetchedVolunteers[0].id
                        }));
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Erro ao carregar voluntários!",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push('/Animais');
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    text: "Erro ao carregar voluntários!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/Animais');
                    }
                });
            })
            .finally(() => {
                setLoading(false);
                console.log('FormData após carregar voluntários e animal:', formData);
            });
    };


    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log('mudou', formData)
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const dataToSend = {
            voluntarioId: parseInt(formData.voluntarioId, 10),
            animalId: parseInt(formData.animalId, 10),
            descricao: " ",
            dataAdocao: formData.dataAdocao,
            nomeAdotante: formData.nomeAdotante,
            cpfAdotante: formData.cpfAdotante,
            telAdotante: formData.telAdotante
          };

        await adocaoService.CadastrarAdocao(dataToSend)
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        text: "Adoção cadastrada com sucesso!",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push('/HistoricoAdocoes');
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Erro ao cadastrar adoção!",
                    });
                }
            })
            .catch((err) => {
                console.log(err.message);
                Swal.fire({
                    icon: "error",
                    text: "Erro ao cadastrar adoção!",
                });
            });
    }

    return (
        <>
            <Page />
            <div className="container-cadastro">
                {
                    loading ?
                        <>
                            <div className='d-flex justify-content-center align-items-center vh-25 mt-5'>
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
                        <form onSubmit={handleSubmit} className="form-adocao">
                            <h2>Cadastrar Adoção</h2>
                            <label>
                                Nome do Animal:
                                <input type="text" name="nomeAnimal" value={formData.nomeAnimal} onChange={handleChange} required disabled />
                            </label>
                            <label>
                                Voluntário Responsável:
                                <select name="voluntarioId" value={formData.voluntarioId} onChange={handleChange} required>
                                    {
                                        voluntarios.map(voluntario => (
                                            <option key={voluntario.id} value={voluntario.id}>{voluntario.nome}</option>
                                        ))
                                    }
                                </select>
                            </label>
                            <label>
                                Data da Adoção:
                                <input type="date" name="dataAdocao" value={formData.dataAdocao} onChange={handleChange} required />
                            </label>
                            <label>
                                Nome do Adotante:
                                <input type="text" name="nomeAdotante" value={formData.nomeAdotante} onChange={handleChange} required />
                            </label>
                            <label>
                                CPF do Adotante:
                                <InputMask
                                    mask="999.999.999-99"
                                    type="text"
                                    name="cpfAdotante"
                                    value={formData.cpfAdotante}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Telefone do Adotante:
                                <InputMask
                                    mask="(99) 99999-9999"
                                    type="text"
                                    name="telAdotante"
                                    value={formData.telAdotante}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit" className="botao-cadastrar">Cadastrar Adoção</button>
                        </form>
                }
            </div>

        </>
    );
}