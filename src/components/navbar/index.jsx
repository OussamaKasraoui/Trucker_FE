import React, { useContext, useEffect, useState } from 'react'
import Mappedarray from '@components/Mappedarray'
import Logo from '@components/reuseable/Logo/Logo'
import NavBarLink from './NavBarLink'
import './navbar.css'
import { ContextApp } from '@components/ContextAPI'
// import { HashLink as Link } from 'react-router-hash-link'
// import Themebtn from '@components/reuseable/Button/Themebtn'
import AppButton from '@components/Button/Button'

import { useTranslation } from "react-i18next";

function Navbar(props) {
    // const { links } = props
    const { t, i18n } = useTranslation("navbar_home");
    const { scrolled, setScrolled } = useContext(ContextApp)
    const [navmenu, setNavmenu] = useState(false)

    const links = [    
        { 
            link: "/" ,
            text: t("landpage"), 
            exact: true,
            // icon: <HomeIcon />, 
        },
        
        { 
            link: "/about" ,
            text: t("products"), 
            exact: true,
            // icon: <ConstructionIcon />, 
        },
        
        { 
            link: "/contact" ,
            text: t("contactus"), 
            exact: true,
            // icon: <MailIcon />, 
        },
    ]

    const linksrow = (
        <Mappedarray array={links}>
            {({ prop }) => (
                <NavBarLink link={prop} />
            )}
        </Mappedarray>
    )

    function handleScroll() {
        if (window.scrollY > 50) {
            setScrolled(true)
        }
        else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    return (
    <div className={`navbar ${scrolled ? 'navscrolled' : ''}`}>
        <Logo text='TurtleX' text2='Digital' />
        <div className="links">
            {linksrow}
        </div>

        <div className={`mobbtn ${navmenu ? "open" : "closed"}`} onClick={() => setNavmenu(!navmenu)}>
            <hr className="l1" />
            <hr className="l2" />
            <hr className="l3" />
        </div>

        <div className={navmenu ? 'navmenu navmenu-enter' : 'navmenu navmenu-exit'}>
            <Logo text='TurtleX' text2='Digital' />
            <div className="linksmenu">
                {links?.map(link => {
                    return <NavBarLink link={link} clickEvent={() => setNavmenu(false)} />
                })}
                <AppButton text='Learn More' icon='fal fa-arrow-right' />
            </div>
        </div>

    </div>
    )
}
export default Navbar