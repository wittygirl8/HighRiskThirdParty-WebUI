"use client";

export default function Overview({ overviewData }) {
  return (
    <>
      <div className="p-4">
        <h5>{overviewData[0]?.selectedName}</h5>
        <div className="pt-3">
          <div className="lh-1">
            <p>Total Payment Made</p>
            <p className="text-secondary">
              {overviewData[0]?.totalPaymentMade}
            </p>
          </div>
          <br />
          <div className="lh-1">
            <p>Total Interaction</p>
            <p className="text-secondary">
              {overviewData[0]?.totalInteraction}
            </p>
          </div>
          <br />
          <div className="lh-1">
            <p>Media Articles</p>
            <p className="text-secondary">{overviewData[0]?.mediaArticles}</p>
          </div>
          <br />
          <div className="lh-1">
            <p>Risk Identified</p>
            <p className="text-secondary">{overviewData[0]?.riskIdentified}</p>
          </div>
        </div>
      </div>
    </>
  );
}
