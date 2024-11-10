'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import './style.css';
import Animal from '@/service/AnimalService';
import Swal from 'sweetalert2';


export default function CadastrarAnimal() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nome: '',
        foto: null,
        raca: '',
        tipo: '',
        informacoes: '',
        sexo: '',
        dataNascimento: '',
        status:false
    });

    const animalService = new Animal();
    
    function handleChange(event) {
        const { name, value, files } = event.target;
        
        if (name === "foto" && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            
            reader.onloadend = () => {

                const base64String = reader.result.split(',')[1];
                setFormData(prevData => ({
                    ...prevData,
                    foto: base64String
                }));
            };
            
            reader.readAsDataURL(file);
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const dataToSend = {
            nome: formData.nome,
            raca: formData.raca,
            Informacoes: formData.informacoes,
            dataNascimento: formData.dataNascimento,
            Status: formData.status,
            foto: formData.foto,
            tipo: formData.tipo,
            Sexo: formData.sexo
        };

        console.log("Dados enviados:", dataToSend);
        


        await animalService.CadastrarAnimal(dataToSend).then((response) => {
            if (response.status == 201) {
                Swal.fire({
                    icon: "success",
                    text: "Animal cadastrado com sucesso!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/Animais');
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Erro ao cadastrar animal!",
                })
            }
        })
        .catch((err) => {
                // console.log(err)
                Swal.fire({
                    icon: "error",
                    text: "Erro ao cadastrar animal!",
                });
        })
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
                    Foto:
                    <input type="file" name="foto" onChange={handleChange} accept="image/*" required />
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
                    <textarea name="informacoes" value={formData.informacoes} onChange={handleChange} />
                </label>
                <label>
                    Sexo:
                    <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                        <option value="">Selecione o sexo</option>
                        <option value="M">Macho</option>
                        <option value="F">Fêmea</option>
                    </select>
                </label>
                <label>
                    Data de Nascimento:
                    <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                </label>
                <button type="submit" className="botao-cadastrar">Cadastrar Animal</button>
            </form>
        </div>
        </>
    )
}
