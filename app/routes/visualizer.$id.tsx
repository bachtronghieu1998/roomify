import React from "react";
import { useLocation, useParams } from "react-router";

const VisualizerId = () => {
  const { id } = useParams();
  const location = useLocation() as { state?: { image?: string } };
  const image = location.state?.image;

  return (
    <div className="visualizer">
      <h1>Visualizer {id}</h1>
      {image ? (
        <img src={image} alt="Uploaded floor plan" />
      ) : (
        <p>No image data available for this visualizer.</p>
      )}
    </div>
  );
};

export default VisualizerId;
