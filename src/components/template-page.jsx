import React from "react";
import { useTranslation } from "react-i18next";

function TemplatePage(props) {
  const { t } = useTranslation(["template"]);

  return (
    <div>
      <h1>{t("title")}</h1>
      <esp-web-install-button manifest="sopfeu.manifest.json">
        <button slot="activate">Install SOPFEU</button>
        <span slot="unsupported">This browser is not supported!</span>
        <span slot="not-allowed">Install not allowed using HTTP!</span>
    </esp-web-install-button>
    </div>
  );
}

export default TemplatePage;
