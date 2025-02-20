import React from 'react';

import { t }  from '../utils/translations';

function About() {
  return (
    <div className="about">
      <h1>{t("about_us")}</h1>
      <p>{t("about_content")}</p>
    </div>
  );
}

export default About;