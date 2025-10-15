import React from 'react'
import Logo from '../atoms/Logo'
import NavBarLinks from '../atoms/NavBarLinks'
import {Layout} from "antd";

const {Header} = Layout

const MainHeader = () => {
    return (
        <Header>
            <Logo />
            <NavBarLinks />
        </Header>
    )
}

export default MainHeader