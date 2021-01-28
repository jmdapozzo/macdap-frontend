import React from "react";
import { useTranslation } from "react-i18next";

function TemplatePage(props) {
  const { t } = useTranslation(["template"]);

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
}

export default TemplatePage;
