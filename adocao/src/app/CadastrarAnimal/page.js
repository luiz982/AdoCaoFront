'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import './style.css';

export default function CadastrarAnimal() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nome: '',
        foto: '',
        raca: '',
        tipo: '',
        observacoes: '',
        sexo: '',
        anoNascimento: ''
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
        console.log('Dados do Animal:', formData);
        router.push('/Animais');
    }

    return(
        <>
        <Page />
        <div className="container-cadastro">
            <form onSubmit={handleSubmit} className="form-cadastro">
            <h2>Cadastrar Animal</h2>
                <label>
                    Nome:
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                </label>
                <label>
                    Foto (URL):
                    <input type="text" name="foto" value={formData.foto} onChange={handleChange} required />
                </label>
                <label>
                    Raça:
                    <input type="text" name="raca" value={formData.raca} onChange={handleChange} required />
                </label>
                <label>
                    Tipo:
                    <select name="tipo" value={formData.tipo} onChange={handleChange} required>
                        <option value="">Selecione o tipo</option>
                        <option value="Gato">Gato</option>
                        <option value="Cachorro">Cachorro</option>
                        <option value="Outros">Outros</option>
                    </select>
                </label>
                <label>
                    Observações:
                    <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} />
                </label>
                <label>
                    Sexo:
                    <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                        <option value="">Selecione o sexo</option>
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                    </select>
                </label>
                <label>
                    Ano de Nascimento:
                    <input type="number" name="anoNascimento" value={formData.anoNascimento} onChange={handleChange} required />
                </label>
                <button type="submit" className="botao-cadastrar">Cadastrar Animal</button>
            </form>
        </div>
        </>
    )
}
