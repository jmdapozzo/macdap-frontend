import React from "react";
import { useTranslation } from "react-i18next";
import {} from "esp-web-tools";

function TemplatePage(props) {
  const { t } = useTranslation(["template"]);

  return (
    <div>
      <h1>{t("title")}</h1>
        <esp-web-install-button manifest="./releases/sopfeu.manifest.json">
          <button type="button" className="btn btn-primary m-3" slot="activate">
            {t("install", { name: "SOPFEU" })}
          </button>
          <span slot="unsupported">This browser is not supported!</span>
          <span slot="not-allowed">Install not allowed using HTTP!</span>
        </esp-web-install-button>

        <esp-web-install-button manifest="./releases/clock.manifest.json">
          <button type="button" className="btn btn-primary m-3" slot="activate">
            {t("install", { name: "Clock" })}
          </button>
          <span slot="unsupported">This browser is not supported!</span>
          <span slot="not-allowed">Install not allowed using HTTP!</span>
        </esp-web-install-button>

        <esp-web-install-button manifest="./releases/chronograph.manifest.json">
          <button type="button" className="btn btn-primary m-3" slot="activate">
            {t("install", { name: "Chronograph" })}
          </button>
          <span slot="unsupported">This browser is not supported!</span>
          <span slot="not-allowed">Install not allowed using HTTP!</span>
        </esp-web-install-button>
    </div>
  );
}

export default TemplatePage;
