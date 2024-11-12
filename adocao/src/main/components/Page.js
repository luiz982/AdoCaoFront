'use client'
import { useState, useContext, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {
    faSquarePlus,
    faLeaf,
    faChartLine,
    faRightFromBracket,
    faGauge,
    faSliders,
    faHouse,
    faDog,
    faScroll,
    faPerson
} from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

export default function Page(props) {
    const router = useRouter();
    const [aberto, setAberto] = useState(true);
    const [key, setKey] = useState(0);

    function forceRerender() {
        setKey(prevKey => prevKey + 1);
    }
    const abrirMenu = (event) => {
        const element = document.getElementById('sidebar');
        let isClickedInsideElement = false
        if(event){
            isClickedInsideElement = element.contains(event.target);
        }
        if (!isClickedInsideElement) {
            setAberto(false)
        } else {
            if (aberto) {
                setAberto(false)
            } else {
                setAberto(true)
            }
        }
    }

    const handleLogOut = () => {
        Swal.fire({
            title: "Deseja Sair?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Sim",
            denyButtonText: `Não`,
            confirmButtonColor: "rgba(0, 122, 255, 1)",
            width: "400px"
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/Login')
            }
        });
    }

    return (
        !props.isLogin ?
            <div className='d-flex' key={key}>
                <Sidebar
                    id='sidebar'
                    onClick={(event) => abrirMenu(event)}
                    collapsed={aberto}
                    rootStyles={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: '100vh',
                        width: '20vh',
                        backgroundColor: 'white !important',
                        marginRight: aberto ? '0' : '1rem',
                        zIndex: 1
                    }}
                >
                     
                    <Menu iconShape="square" style={{marginTop: '20px'}} >
                    <div style={{ display: "flex", flexDirection: "column", height: "89vh" }}>
                        <MenuItem className='menuText' onClick={() => router.push('/Principal')} ><FontAwesomeIcon className='menuItem' icon={faHouse} /> Home</MenuItem>
                        <MenuItem className='menuText' onClick={() => router.push('/Animais')}><FontAwesomeIcon className='menuItem' icon={faDog} onClick={() => abrirMenu()} /> Animais </MenuItem>
                        <MenuItem className='menuText' onClick={() => router.push('/HistoricoAdocoes') }><FontAwesomeIcon className='menuItem' icon={faScroll} onClick={() => abrirMenu()} /> Histórico </MenuItem>
                        <MenuItem className='menuText' onClick={() => router.push('/Voluntarios')} ><FontAwesomeIcon className='menuItem' icon={faPerson}/>  Voluntários </MenuItem>
                    </div>
                        <MenuItem className='menuText' onClick={() => handleLogOut()} ><FontAwesomeIcon className='menuItem' icon={faRightFromBracket} />
                            {!aberto && <span style={{ marginLeft: "10px" }}>Sair</span>}
                        </MenuItem>
                    </Menu>

                </Sidebar>
                <div className="mx-auto" id="content" onClick={() =>{setAberto(true)}}>
                    {props.children}
                </div>
            </div>
            :
            <>
                <div onClick={() =>{setAberto(true)}}>
                    {props.children}
                </div>
            </>
    )
}