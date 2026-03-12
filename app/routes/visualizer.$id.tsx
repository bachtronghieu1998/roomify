import { Container } from "lucide-react";
import React from "react";
import { useLocation, useParams } from "react-router";

const VisualizerId = () => {
  const { id } = useParams();
  const location = useLocation();
  const { initialImage, name } = location.state || {};
  return (
    <section>
      <h1>{name || "Untitled Project"}</h1>
      <div className="visualizer">
        {initialImage && (
          <div className="image-Container">
            <h2>Source Image</h2>
            <img src={initialImage} alt="source" />
          </div>
        )}
      </div>
    </section>
  );
};

export default VisualizerId;
