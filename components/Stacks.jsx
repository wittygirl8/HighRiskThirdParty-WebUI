import React from 'react';

const Stacks = ({ data }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-md-3">
            <div className="card custom-card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.title.toUpperCase()}</h5>
                <h3 className="card-text">{item.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stacks;
