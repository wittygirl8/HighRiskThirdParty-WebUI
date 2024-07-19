import spainGeoUrl from "@/../public/spain-features.json";
import usaGeoUrl from "@/../public/usa-features.json";
import brazilGeoUrl from "@/../public/brazil-features.json";

const countrySettingsMap = {
  Spain: {
    rotate: [-10.0, -53.0, 0],
    center: [-15, -25],
    scale: 600,
  },
  Brazil: {
    rotate: [0, 0, 0],
    center: [-80, -120],
    scale: 200,
  },
  "United States": {
    rotate: [-10, 0, 0],
    center: [-100, 10],
    scale: 300,
  },
};

const countryUrlMap = {
  Spain: spainGeoUrl,
  Brazil: brazilGeoUrl,
  "United States": usaGeoUrl,
};

export { countrySettingsMap, countryUrlMap };
