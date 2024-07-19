import React from "react";

const Stats = ({ data = [] }) => {
  return (
    <div className="container mt-5 text-center">
      <div className="row">
        {data?.map((item, index) => (
          <div key={index} className="col-md-3">
            <div className="card custom-card mb-3">
              <div className="card-body bg-secondary">
                <h5 className="card-title text-white">{item.title}</h5>
                <h3 className="card-text text-white">{item.count}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
