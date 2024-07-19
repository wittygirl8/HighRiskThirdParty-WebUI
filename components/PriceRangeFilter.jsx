"use cient";

import { Button } from "react-bootstrap";
import RangeSlider from "react-range-slider-input";

export default function PriceRangeFilter({
  handlePriceRangeChange,
  setValue,
  selectedCountry,
  min,
  max,
  value,
}) {
  const currencyMap = {
    Spain: "€",
    Brazil: "R$",
    "United States of America": "$",
    "": "$",
  };
  return (
    <div className="mb-5 mx-5 mt-0">
      Payment range
      {selectedCountry ? (
        <div className="d-flex justify-content-between">
          <div className="p-2">{`${
            currencyMap[selectedCountry]
          } ${min.toLocaleString()}`}</div>
          <div className="p-2">{`${
            currencyMap[selectedCountry]
          } ${max.toLocaleString()}`}</div>
        </div>
      ) : (
        <div className="p-2"></div>
      )}
      <RangeSlider min={min} max={max} onInput={setValue} />
      {!selectedCountry ? (
        <div className="mt-3">Select a country to get the range</div>
      ) : (
        <div className="mt-3">{`Selected from ${
          currencyMap[selectedCountry]
        } ${value[0].toLocaleString()} to ${
          currencyMap[selectedCountry]
        } ${value[1].toLocaleString()}`}</div>
      )}
      <div className="d-flex flex-row-reverse mt-2">
        <Button variant="primary" onClick={(e) => handlePriceRangeChange(e)}>
          Filter
        </Button>
      </div>
    </div>
  );
}
