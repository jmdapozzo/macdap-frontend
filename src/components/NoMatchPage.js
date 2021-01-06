import React from "react";
import { useTranslation } from 'react-i18next';

function NoMatchPage(props) {

  const { t } = useTranslation(['common']);

  return (
      <div>
        <h1>{t('noMatch')}</h1>
      </div>
    );
}

export default NoMatchPage
