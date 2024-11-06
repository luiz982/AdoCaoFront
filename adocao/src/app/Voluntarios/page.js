'use client';
import { useState, useEffect } from 'react';
import Page from '@/main/components/Page';
import './style.css';
import { useRouter } from 'next/navigation';


export default function ListaVoluntarios() {
    const [voluntarios, setVoluntarios] = useState([]);
    const router = useRouter();
    useEffect(() => {
        async function fetchVoluntarios() {
            const response = await fetch('/voluntarios.json');
            const data = await response.json();
            setVoluntarios(data);
        }
        fetchVoluntarios();
    }, []);

    return (
        <>
        <Page />
        <div className="container-voluntarios">
            <div className="container-coluna">
            <h2>Lista de Voluntários</h2>
            <button className="botao-cadastrar" type="button" onClick={() => router.push('/CadastrarVoluntario')}>
                Cadastrar Novo Voluntário
            </button>
                {voluntarios.map(voluntario => (
                    <div key={voluntario.id} className="card-voluntario">
                        <div className="card-detalhes">
                            <h3>{voluntario.nome}</h3>
                            <p><strong>Ano de Nascimento:</strong> {voluntario.anoNascimento}</p>
                            <p><strong>Telefone:</strong> {voluntario.telefone}</p>
                            <p><strong>Email:</strong> {voluntario.email}</p>
                        </div>
                        <button className="botao-remover">Remover</button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
