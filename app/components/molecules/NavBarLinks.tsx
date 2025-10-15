import React from 'react'
import {Menu} from 'antd'

const NavBarLinks = () => {
    return(
        <Menu mode='horizontal' items={[
            {key: 1, label:'Inicio'},
            {key: 2, label:'Sobre mi'},
            {key: 3, label:'Proyectos'},
            {key: 4, label:'Contacto'}
        ]}/>
    )
}

export default NavBarLinks;