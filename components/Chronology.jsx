"use client";

import { useEffect, useState, useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";

const CATEGORIES = [
  "External News Event",
  "Meeting - Attended",
  //"Meeting - Invited",
  "Interaction - MSL",
  "Interaction - Rep",
  "CERPS Invoice",
  "Monetary TOV",
  "Non Monetary TOV",
];

const checkForLink = (str) => {
  const allowedHosts = ['news.google.com'];
 
  if (!str) {
    return "";
  }
 
  try {
    const url = new URL(str);
    const host = url.host;
    const truncatedStr = str.length > 60 ? `${str.substring(0, 57)}...` : str;
 
    if (allowedHosts.includes(host)) {
      return <a href={str} target="_blank" rel="noopener noreferrer">{truncatedStr}</a>;
    } else {
      return truncatedStr;
    }
  } catch (error) {
    const truncatedStr = str.length > 100 ? `${str.substring(0, 97)}...` : str;
    return truncatedStr;
  }
};

export default function Chronology({ chronologyData }) {
  const [chronology, setChronology] = useState([]);
  let [categoryFilters, setcategoryFilters] = useState(new Set(""));

  useEffect(() => {
    setChronology(chronologyData);
  }, [chronologyData]);

  const updateFilters = (checked, categoryFilter) => {
    if (checked)
      setcategoryFilters((prev) => new Set(prev).add(categoryFilter));
    if (!checked)
      setcategoryFilters((prev) => {
        const next = new Set(prev);
        next.delete(categoryFilter);
        return next;
      });
  };

  const filteredEvents =
    categoryFilters.size === 0
      ? chronology
      : chronology.filter((p) => categoryFilters.has(p.category));

  return (
    <>
      <Row>
        <Col xs={3} style={{ zIndex: "2" }}>
          <div className="row justify-content-center">
            <div className="card-body p-4">
              <h5 className="card-title widget-card-title mb-3">Categories</h5>
              <ul style={{ listStyleType: "none" }}>
                {CATEGORIES.map((category) => (
                  <li key={category}>
                    <Form.Check
                      label={category}
                      onChange={(e) =>
                        updateFilters(e.target.checked, category)
                      }
                      type="checkbox"
                      value={category}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
        <Col xs={9}>
          <div className="row justify-content-center">
            <div className=" bsb-chronology-8">
              <div className="card-body p-4">
                <h5 className="card-title widget-card-title mb-3">
                  Recent Transactions
                </h5>
              </div>
              {filteredEvents.map((event) => {
                return (
                  <ul className="chronology">
                    <li className="chronology-item">
                      <div className="chronology-body">
                        <div className="chronology-meta">
                          <span>{event?.date}</span>
                        </div>
                        <div className="chronology-content chronology-indicator">
                          <h6 className="mb-1">
                            {checkForLink(event?.description)}
                          </h6>
                          <span className="text-secondary fs-7">
                            {event?.tag} | {event?.category}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
