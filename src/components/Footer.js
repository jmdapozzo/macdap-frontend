import React from "react";
import { useTranslation } from 'react-i18next';
import { Jumbotron, Image } from 'react-bootstrap';
import logo from '../images/logo/noBackgroundNoText.svg';


function Footer() {

  const { t } = useTranslation(['common']);

  return (
    <div className="footer">
      <Jumbotron className="mb-0">
        <div className="d-inline-flex p-3">
          <p class="m-0 text-center">
            Copyright &copy; {t('company')} {new Date().getFullYear()}
          </p>
        </div>
      </Jumbotron>
    </div>
  );
}

export default Footer;
