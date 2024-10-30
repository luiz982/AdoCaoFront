'use client'
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Page from '@/main/components/Page';
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading'
import '../Principal/style.css'
import homePage from '../../assets/imagempagPrincipal.png'


export default function Principal() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter();

    return (
        <Page>
            <div>
                <section id="hero" className="hero d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 d-flex flex-column justify-content-center">
                                <h1 data-aos="fade-up">Bem-vindo ao sistema de gestão da ADASFA!</h1>
                                <h1 data-aos="fade-up"></h1>
                                <h2 data-aos="fade-up" data-aos-delay="400">Sistema para acompanhamento e controle de adoções!</h2>
                                <div data-aos="fade-up" data-aos-delay="600">
                                    <div className="text-center text-lg-start" >
                                        <a  onClick={() => router.push('/Animais')} className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                            <span>Começar!</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
                                <Image src={homePage} className="img-fluid" alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Page>
    );
}