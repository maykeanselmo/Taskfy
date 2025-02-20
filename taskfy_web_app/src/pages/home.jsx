import React from 'react';
import { t } from '../utils/translations'

function Home() {
  return (
    <div className="home">
      <h1>{t("initial_page")}</h1>
      <p>{t("welcome_message")}</p>
    </div>
  );
}

export default Home;