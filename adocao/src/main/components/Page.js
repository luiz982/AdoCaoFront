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
    faHouse
} from '@fortawesome/free-solid-svg-icons';

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

    return (
        !props.isLogin ?
            <div className='d-flex' key={key}>
                {/* Cabeçalho */}
                <Sidebar
                    id='sidebar'
                    onClick={(event) => abrirMenu(event)}
                    collapsed={aberto}
                    rootStyles={{
                        height: '100vh',
                        width: '30vh',
                        backgroundColor: 'white !important',
                        marginRight: aberto ? '0' : '1rem'
                    }}
                >
                    <hr className='form mx-auto'></hr>
                    <Menu iconShape="square" >
                        <MenuItem className='menuText' onClick={() => router.push('/Principal')} ><FontAwesomeIcon className='menuItem' icon={faHouse} />Home</MenuItem>
                        <MenuItem className='menuText' onClick={() => router.push('/PlantioColheita')}><FontAwesomeIcon className='menuItem' icon={faLeaf} onClick={() => abrirMenu()} />  Plantio e Colheita </MenuItem>
                        <MenuItem className='menuText' onClick={() => router.push('/Inclusao') }><FontAwesomeIcon className='menuItem' icon={faSquarePlus} onClick={() => abrirMenu()} /> Inclusão </MenuItem>
                        <MenuItem className='menuText'><FontAwesomeIcon className='menuItem' icon={faGauge} onClick={() => abrirMenu()} /> Dashboards </MenuItem>
                        <MenuItem className='menuText' onClick={() => router.push('/Relatorios')} ><FontAwesomeIcon className='menuItem' icon={faChartLine}/>  Relatórios </MenuItem>
                        <MenuItem className='menuText'><FontAwesomeIcon className='menuItem' icon={faSliders} onClick={() => abrirMenu()} /> Parâmetros</MenuItem>
                        <MenuItem className='menuText' style={{ position: "fixed", bottom: "0.6rem", width: "100%" }} onClick={() => userContext.logOut()} ><FontAwesomeIcon className='menuItem' icon={faRightFromBracket} />
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