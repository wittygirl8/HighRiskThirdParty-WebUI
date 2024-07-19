"use client";

import { Col, Row } from "react-bootstrap";
import Combobox from "react-widgets/Combobox";
import { useEffect, useState } from "react";

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

export default function EventTimeline({ eventTimelineData }) {
  const [filteredTimelineData, setFilteredTimelineData] =
    useState(eventTimelineData);
  const [timelineData, setTimelineData] = useState([]);
  const [category, setCategory] = useState("");
  const [entity, setEntity] = useState("");
  const [emotion, setEmotion] = useState("");
  const emotionMap = {
    positive: "success",
    neutral: "info",
    negative: "danger",
  };

  useEffect(() => {
    setFilteredTimelineData(eventTimelineData);
    setTimelineData(eventTimelineData);
  }, [eventTimelineData]);

  useEffect(() => {
    //Filter options updated so apply all filters here
    const result = timelineData
      .filter((item) => {
        if (!category) {
          return true;
        } else {
          return item.category === category;
        }
      })
      .filter((data) => {
        if (!entity) {
          return true;
        } else {
          return data.flag === entity;
        }
      })
      .filter((obj) => {
        if (!emotion) {
          return true;
        } else {
          return obj.sentiment.toLowerCase() === emotion.toLowerCase();
        }
      });

    setFilteredTimelineData(result);
  }, [category, entity, emotion]);

  return (
    <>
      <Row>
        <Col xs={3}>
          <div className="row justify-content-center">
            <div className="card-body p-4">
              <h5 className="card-title widget-card-title mb-3">Filters</h5>
              <div className="pb-2">
                Categories
                <Combobox
                  data={["Announcement", "Research", "Legal"]}
                  onChange={(_) => setCategory(_)}
                />
              </div>
              <div className="pt-2">
                Entity
                <Combobox
                  data={["HCO", "HCP"]}
                  onChange={(_) => setEntity(_)}
                />
              </div>
              <div className="pt-2">
                Sentiment
                <Combobox
                  data={["Positive", "Neutral", "Negative"]}
                  onChange={(_) => setEmotion(_)}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={9}>
          <div className="p-4">
            <h5 className="card-title widget-card-title mb-3">
              External Events
            </h5>
          </div>
          <div className="col-md-10 offset-md-2">
            <ul className="timeline">
              {filteredTimelineData.map((data) => {
                return (
                  <>
                    <li>
                      <p>{checkForLink(data.title)}</p>
                      <span
                        className={`text-${
                          emotionMap[data.sentiment.toLowerCase()]
                        }`}
                      >
                        {data.category} | {data.flag} | {data.sentiment}
                        {data.hcp ? ` - ${data.hcp}` : ` - ${data.hco}`}
                      </span>
                      <p className="fst-italic float-end">{data.date}</p>
                      <p>{checkForLink(data.link)}</p>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </>
  );
}
