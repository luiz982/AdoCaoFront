'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import '../AnimalClicado/style.css'
import Animal from '@/service/AnimalService';  // Supondo que Animal seja uma classe
import Swal from 'sweetalert2';


// Função para calcular a idade do animal
function calcularIdade(dataNascimento) {
    const dataNascimentoObj = new Date(dataNascimento);
    const anoNascimento = dataNascimentoObj.getFullYear();
    const mesNascimento = dataNascimentoObj.getMonth();
    const diaNascimento = dataNascimentoObj.getDate();
    
    const anoAtual = new Date().getFullYear();
    const mesAtual = new Date().getMonth();
    const diaAtual = new Date().getDate();
    
    let idade = anoAtual - anoNascimento;


    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade -= 1;
    }

    if (idade === 0) {
        return "Menos de 1 ano";
    } else if (idade === 1) {
        return "1 ano";
    } else {
        return `${idade} anos`;
    }
}

function formatarSexo(sexo) {
    return sexo === 'M' ? 'Macho' : 'Fêmea';
}

export default function AnimalClicado() {
    const router = useRouter();
    const [animalId, setAnimalId] = useState(null);
    const [animal, setAnimal] = useState(null);
    const animalInstance = new Animal()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            setAnimalId(id);
            console.log("Id do animal:", id);
        }
    }, []);

 
    useEffect(() => {
        if (animalId) {
            async function fetchAnimal() {
                try {
                    const animalInstance = new Animal();
                    const response = await animalInstance.BuscarAnimalEspecifico(animalId);
                    if (response && response.data) {
                        setAnimal(response.data);
                        console.log("Dados do animal:", response.data);
                    } else {
                        console.error('Animal não encontrado ou erro na resposta');
                    }
                } catch (error) {
                    console.error('Erro ao buscar animal:', error);
                }
            }
            fetchAnimal();
        }
    }, [animalId]);

    // Verifica se o animal ainda não foi carregado
    if (!animal) return <div>Carregando...</div>;

    // Calcula a idade do animal
    const idade = calcularIdade(animal.dataNascimento);

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
                deletarAnimal(id)
            } 
          });
    }

    const deletarAnimal = async (id) =>{
        await animalInstance.DeletarAnimal(id).then((response) => {
            if(response.status == 200){
                Swal.fire({
                    icon: "success",
                    text: "Animal deletado com sucesso!",
                });
            }else{
                Swal.fire({
                    icon: "error",
                    text: "Erro ao deletar Animal!",
                });
            }
        })
        .catch((err) => {
            // console.log(err)
            Swal.fire({
                icon: "error",
                text: "Erro ao deletar animal!",
            });
        })
        .finally(() => {
            router.push('/Animais');
        })
    }

    return (
        <>
            <Page />
            <div className='container-maior'>
                <div className="card-principal">
                    <div className="card-conteudo">
                        <div className="card-imagem">
                            {/* Exibe a foto em base64 */}
                            <img src={`data:image/jpeg;base64,${animal.foto}`} alt={animal.nome} />
                        </div>
                        <div className="card-infos">
                            <h5 className="card-titulo">{animal.nome}</h5>
                            <p className="card-texto"><strong>Tipo:</strong> {animal.tipo}</p>
                            <p className="card-texto"><strong>Idade:</strong> {idade}</p>
                            <p className="card-texto"><strong>Sexo:</strong> {formatarSexo(animal.sexo)}</p>
                        </div>
                    </div>
                    <div>
                        <p><strong>Raça:</strong> {animal.raca}</p>
                        <p><strong>Observações:</strong> {animal.informacoes}</p>
                    </div>

                    <button className="botao-adocao" onClick={() => router.push(`/CadastrarAdocao?id=${animalId}`)}>
                        Cadastrar adoção
                    </button>
                    <button className="botao-deletar" onClick={() => handleDelete(animal.id)} >
                        Apagar Animal
                    </button>
                    <button className="botao" onClick={() => router.push('/Animais')}>
                        Voltar para a lista de animais
                    </button>
                </div>
            </div>
        </>
    );
}
