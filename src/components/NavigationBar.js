import React from 'react'
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar = () => {

    const { t, i18n } = useTranslation(['common', 'home', 'sopfeu', 'users', 'template']);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">{t('brand')}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item>
                        <Nav.Link href="/">{t('home:title')}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/sopfeu">{t('sopfeu:title')}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/users">{t('users:title')}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/template">{t('template:title')}</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className="navbar-right">
                    <Nav.Item>
                        <NavDropdown title={t('language')} id="collasible-nav-dropdown">
                            {i18n.languages.map((value) => {
                                var languageT = i18n.getFixedT(value, 'common');
                                var languageName = languageT('language');
                                return <NavDropdown.Item key={value}>{languageName}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/login">{t('navBar.login')}</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default NavigationBar
