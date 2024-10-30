'use client'
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {
    faSquarePlus,

} from '@fortawesome/free-solid-svg-icons';
import homePage from '../../assets/imagempagPrincipal.png'
import '../styles/PetCard.css'

export default function PetCard(props) {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter();


    return (
        <div className="card">
            <img src={props.src} className="imgCard" alt="" />
            <div className="card-body text-center">
                <h5 className="card-title">{props.nome}</h5>
                <p className="card-text">{props.tipo}</p>
                <p className="card-text">Idade: 1 ano e 4 meses</p>
                <p className="card-text">Raça: {props.raca}</p>
            </div>
        </div>
    )
}