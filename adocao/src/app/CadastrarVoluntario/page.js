'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import './style.css';

export default function CadastrarVoluntario() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nome: '',
        anoNascimento: '',
        telefone: '',
        email: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Dados do Voluntário:', formData);
        // Aqui você pode adicionar lógica para salvar os dados ou fazer outro processamento
        router.push('/Voluntarios'); // Redireciona para a lista de voluntários
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
                    Ano de Nascimento:
                    <input type="number" name="anoNascimento" value={formData.anoNascimento} onChange={handleChange} required />
                </label>
                <label>
                    Telefone:
                    <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
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
