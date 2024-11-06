'use client'
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import '../styles/PetCard.css'

function calcularIdade(anoNascimento) {
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - anoNascimento;

    return idade === 0 ? "Menos de 1 ano" : `${idade} anos`;
}


export default function PetCard(props) {
    const router = useRouter();

    useEffect(() => {
        console.log("Props recebidas pelo PetCard:", props);
    }, [props]);

    const idade = calcularIdade(props.dataNascimento);

    return (
        <button 
        className="card p-0 card-botao"
        onClick={() => router.push(`/AnimalClicado?id=${props.id}`)}
    >
        <img src={props.src} className="imgCard" alt="" />
        <div className="card-body">
            <h5 className="card-title card-texto">{props.nome}</h5>
            <p className="card-text card-texto">{props.tipo}</p>
            <p className="card-text card-texto">Idade: {idade}</p>
            <p className="card-text card-texto">Sexo: {props.sexo}</p>
        </div>
        </button>
    )
}