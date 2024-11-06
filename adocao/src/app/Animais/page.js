'use client'
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
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
    const [animais, setAnimais] = useState([]);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState(null);
    const itemsPerPage = 8;
    const router = useRouter();
    const opcoesTipo = [
        { value: 'Todos', label: 'Todos' },
        { value: 'Cachorro', label: 'Cachorro' },
        { value: 'Gato', label: 'Gato' },
    ]

    useEffect(() => {
        async function fetchAnimais() {
            const response = await fetch('/animais.json');
            const data = await response.json();
            console.log(data)
            setAnimais(data);
        }
        fetchAnimais();
    }, []);
 
    
    const filteredAnimals = animais.filter(animal => {
        const matchesType = selectedType && selectedType.value !== 'Todos' ? animal.tipo === selectedType.value : true;
        const matchesSearch = animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            animal.raca.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAnimals.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSelectChange = (selectedOption) => {
        setSelectedType(selectedOption);
        setCurrentPage(1);
    };

    return (
        <>
        <Page/>
            <div className='container-principal'>
                <div className='container-conteudo'>
                    <h1 className='mb-3 text-center  mb-5'>Pets para adoção</h1>
                    <div className="container-nav">
                        <div className='filtros d-flex justify-content-between mb-3'>
                            <div className="mt-3">
                                <button type="button" onClick={() => router.push('/CadastrarAnimal')} className="btn btn-primary"><FontAwesomeIcon style={{ marginRight: "8px" }} icon={faPlus} /> Novo Pet</button>
                            </div>
                            <div className="d-flex justify-content-end m-3" style={{ gap: "15px" }}>
                                <div style={{ width: "250px" }}>
                                    <Select
                                        options={opcoesTipo}
                                        isClearable={isClearable}
                                        isDisabled={isDisabled}
                                        value={selectedType}
                                        onChange={handleSelectChange}
                                        placeholder="Selecione o tipo"
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
                    <div className="container-animais">
                        <div className="row">
                            {currentItems.map((value, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5 fileira-cards">
                                    <PetCard 
                                        id={value.id} 
                                        src={value.foto}
                                        nome={value.nome}
                                        tipo={value.tipo}
                                        raca={value.raca}
                                        dataNascimento={value.anoNascimento}
                                        sexo={value.sexo}
                                    />
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
                    {[...Array(Math.ceil(filteredAnimals.length / itemsPerPage)).keys()].map(number => (
                        <li key={number} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(number + 1)}>
                                {number + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(filteredAnimals.length / itemsPerPage) ? "disabled" : ""}`}>
                        <button className="page-link" onClick={nextPage}>Próximo</button>
                    </li>
                </ul>
            </nav>
            </>
    );
}