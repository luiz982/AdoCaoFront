'use client'
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import '../CadastrarAdocao/style.css'


export default function CadastrarAdocao() {

    const router = useRouter();
    const [formData, setFormData] = useState({
        nomeAnimal: '',
        voluntario: '',
        dataAdocao: '',
        nomeAdotante: '',
        cpfAdotante: '',
        telefoneAdotante: ''
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
        console.log('Dados de Adoção:', formData);
        router.push('/Animais');
    }

    return(
        <>
        <Page />
        <div className="container-cadastro">
            
            <form onSubmit={handleSubmit} className="form-adocao">
            <h2>Cadastrar Adoção</h2>
                <label>
                    Nome do Animal:
                    <input type="text" name="nomeAnimal" value={formData.nomeAnimal} onChange={handleChange} required />
                </label>
                <label>
                    Voluntário Responsável:
                    <select name="voluntario" value={formData.voluntario} onChange={handleChange} required>
                        <option value="">Selecione o voluntário</option>
                        <option value="Voluntário A">Voluntário A</option>
                        <option value="Voluntário B">Voluntário B</option>
                        <option value="Voluntário C">Voluntário C</option>
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
                    <input type="text" name="cpfAdotante" value={formData.cpfAdotante} onChange={handleChange} required />
                </label>
                <label>
                    Telefone do Adotante:
                    <input type="text" name="telefoneAdotante" value={formData.telefoneAdotante} onChange={handleChange} required />
                </label>
                <button type="submit" className="botao-cadastrar">Cadastrar Adoção</button>
            </form>
        </div>
        </>

    )
}