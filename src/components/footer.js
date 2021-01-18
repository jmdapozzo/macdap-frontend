import React from "react";
import { useTranslation } from 'react-i18next';


function Footer() {

  const { t } = useTranslation(['common']);

  //Check this logo pattern taken from auth0-react-sdk-video
  return (
    <footer className="bg-light p-3 text-center">
      <div className="logo" />
      <p>
        Sample project provided by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://macdap.com">
          MacDap
      </a>
      </p>
      <p className="m-0 text-center">
        Copyright &copy; {t('company')} 2020 - {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
