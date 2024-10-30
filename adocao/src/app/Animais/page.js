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
import {
    faSearch,
    faPlus

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

export default function Animais() {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); 
    const itemsPerPage = 8;
    const router = useRouter();
    const opcoesTipo = [
        { value: 'Todos', label: 'Todos' },
        { value: 'Cachorro', label: 'Cachorro' },
        { value: 'Gato', label: 'Gato' },
    ]
    const Animais = [
        { nome: 'Max' ,raca: 'Pitbull' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Tito',raca: 'Labrador' , foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Luna',raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
        { nome: 'Max' ,raca: 'Labrador' ,foto: 'https://s2-g1.glbimg.com/RVuzSU6kwzy1OwcUwUizgW577b0=/0x161:900x744/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/B/bdA6Z4Rz6C5yyrB07Tcg/whatsapp-image-2021-07-13-at-4.29.58-pm.jpeg' },
    ]

    const filteredAnimals = Animais.filter(animal => 
        animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.raca.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAnimals.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <Page>
            <div className='card-container'>
                <div className='container'>
                    <h1 className='mb-3 text-center  mb-5'>Pets para adoção</h1>
                    <div className="container">
                        <div className='filtros d-flex justify-content-between mb-3'>
                            <div className="mt-3">
                                <button type="button" className="btn btn-primary"><FontAwesomeIcon style={{ marginRight: "8px" }} icon={faPlus} /> Novo Pet</button>
                            </div>
                            <div className="d-flex justify-content-end m-3" style={{ gap: "15px" }}>
                                <div style={{ width: "250px" }}>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={opcoesTipo[0]}
                                        isDisabled={isDisabled}
                                        isLoading={isLoading}
                                        name="tipo"
                                        options={opcoesTipo}
                                    />
                                </div>
                                <div className="input-group" style={{ width: "300px" }}>
                                    <input
                                        type="text"
                                        className="form-control input-small"
                                        placeholder="Digite o nome ou raça"
                                        style={{ marginLeft: "15px" }}
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <button className="btn btn-primary" type="button">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            {currentItems.map((value, index) => (
                                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
                                    <PetCard src={value.foto} nome={value.nome} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation" className="mt-2">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={prevPage}>Anterior</button>
                            </li>
                            {[...Array(Math.ceil(Animais.length / itemsPerPage)).keys()].map(number => (
                                <li key={number} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(number + 1)}>
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(Animais.length / itemsPerPage) ? "disabled" : ""}`}>
                                <button className="page-link" onClick={nextPage}>Próximo</button>
                            </li>
                        </ul>
                    </nav>
        </Page>
    );
}