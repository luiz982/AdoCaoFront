'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import Voluntario from '@/service/VoluntarioService';
import './style.css';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';

export default function CadastrarVoluntario() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        telefone: '',
        email: ''
    });

    const voluntarioService = new Voluntario();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const dataToSend = {
            nome: formData.nome,
            dataNascimento: new Date(formData.dataNascimento).toISOString(),
            tel: formData.telefone,
            email: formData.email
        };

        await voluntarioService.CadastrarVoluntario(dataToSend).then((response) => {
            if (response.status == 201) {
                Swal.fire({
                    icon: "success",
                    text: "Usuário cadastrado com sucesso!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/Voluntarios');
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Erro ao cadastrar usuário!",
                })
            }
        })
        .catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    text: "Erro ao cadastrar usuário!",
                });
        })
    }

    return (
        <>
            <Page />
            <div className="container-cadastro">
                <form onSubmit={handleSubmit} className="form-cadastro">
                    <h2>Cadastrar Voluntário</h2>
                    <label>
                        Nome:
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                    </label>
                    <label>
                        Data de Nascimento:
                        <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                    </label>
                    <label>
                        Telefone:
                        <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <button type="submit" className="botao-cadastrar">Cadastrar Voluntário</button>
                </form>
            </div>
        </>
    );
}
