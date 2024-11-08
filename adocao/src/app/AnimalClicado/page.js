'use client'
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import '../AnimalClicado/style.css'


export default function AnimalClicado() {
    const router = useRouter();
    const [animalId, setAnimalId] = useState(null);
    const [animal, setAnimal] = useState(null);

    function calcularIdade(anoNascimento) {
        const anoAtual = new Date().getFullYear();
        const idade = anoAtual - anoNascimento;
        return idade === 0 ? "menos de 1 ano" : `${idade} anos`;
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            setAnimalId(id);
            console.log("Id do animal:", id);
        }
    }, []);

    useEffect(() => {
        async function fetchAnimal() {
            const response = await fetch('/animais.json');
            const data = await response.json();
            const selectedAnimal = data.find(animal => animal.id === parseInt(animalId));
            console.log(data);
            setAnimal(selectedAnimal);
        }
        fetchAnimal();
    }, [animalId]);


    
    if (!animal) return <div>Algum erro aconteceu</div>;

    return (
        <>
        <Page/>
            <div className='container-maior'>
                <div className="card-principal">
                    <div className="card-conteudo">
                        <div className="card-imagem">
                            <img src={animal.foto} alt={animal.nome} />
                        </div>
                        <div className="card-infos">
                            <h5 className="card-titulo">{animal.nome}</h5>
                            <p className="card-texto"><strong>Tipo:</strong> {animal.tipo}</p>
                            <p className="card-texto"><strong>Idade:</strong> {calcularIdade(animal.anoNascimento)}</p>
                            <p className="card-texto"><strong>Sexo:</strong> {animal.sexo}</p>
                        </div>
                    </div>
                    <p><strong>Observações:</strong> {animal.observacoes}</p>
                    <button className="botao-adocao" onClick={() => router.push(`/CadastrarAdocao?id=${animalId}`)}>
                        Cadastrar adoção
                    </button>
                    <button className="botao" onClick={() => router.push('/Animais')}>
                        Voltar para a lista de animais
                    </button>
                </div>
            </div>
        </>
    );
}