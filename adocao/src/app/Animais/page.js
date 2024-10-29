'use client'
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading'
import Page from '@/main/components/Page';
import '../Principal/style.css'
import '../Animais/style.css'
import PetCard from '@/main/components/PetCard';


export default function Animais() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter();

    return (
        <Page>
            <div className="card-container">
                <PetCard></PetCard>
                <PetCard></PetCard>
                <PetCard></PetCard>
                <PetCard></PetCard>
                <PetCard></PetCard>
                <PetCard></PetCard>
            </div>
        </Page>
    );
}