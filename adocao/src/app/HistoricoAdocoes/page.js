'use client';
import { useState, useEffect } from 'react';
import Page from '@/main/components/Page';
import './style.css';
import { useRouter } from 'next/navigation';

export default function HistoricoAdocoes() {
    const [adocoes, setAdocoes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchAdocoes() {
            const response = await fetch('/adocoes.json');
            const data = await response.json();
            setAdocoes(data);
        }
        fetchAdocoes();
    }, []);

    return (
        <>
        <Page />
        <div className="container-adocoes">
            <div className="container-coluna">
                <h2>Histórico de Adoções</h2>
                <button className="botao-cadastrar" type="button" onClick={() => router.push('/CadastrarAdocao')}>
                    Cadastrar Nova Adoção
                </button>
                {adocoes.map(adocao => (
                    <div key={adocao.id} className="card-adocao">
                        <div className="card-detalhes">
                            <h3>{adocao.nomeAnimal}</h3>
                            <p><strong>Voluntário:</strong> {adocao.nomeVoluntario}</p>
                            <p><strong>Data da Adoção:</strong> {adocao.dataAdocao}</p>
                            <p><strong>Adotante:</strong> {adocao.nomeAdotante}</p>
                            <p><strong>CPF do Adotante:</strong> {adocao.cpfAdotante}</p>
                            <p><strong>Telefone do Adotante:</strong> {adocao.telefoneAdotante}</p>
                        </div>
                        <button className="botao-remover">Remover</button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
