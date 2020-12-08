import React from "react";
import { useTranslation } from 'react-i18next';


function Footer() {

  const { t } = useTranslation(['common']);

  return (
    <div className="footer">
      <footer class="py-5 bg-dark fixed-bottom">
        <div class="container">
          <p class="m-0 text-center text-white">
            Copyright &copy; {t('company')} 2020
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
