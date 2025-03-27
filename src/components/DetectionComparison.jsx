import React, {useState} from "react";


const detectionModels = {
  "Yolov8s": {
    labels: "/images/detectionresults/YOLOv8s/labels.jpg",
    prediction: "/images/detectionresults/YOLOv8s/prediction.jpg",
  },
  "Yolov8s + P2": {
    labels: "/images/detectionresults/YOLOv8s_P2/labels.jpg",
    prediction: "/images/detectionresults/YOLOv8s_P2/prediction.jpg",
  },
  "Yolov8s + Focus": {
    labels: "/images/detectionresults/YOLOv8s_focus/labels.jpg",
    prediction: "/images/detectionresults/YOLOv8s_focus/prediction.jpg",
  },
  "Yolov11": {
    labels: "/images/detectionresults/YOLOv11s/labels.jpg",
    prediction: "/images/detectionresults/YOLOv11s/prediction.jpg",
  },
};

const DetectionComparison = () => {
    const [selectedModel, setSelectedModel] = useState("Yolov8s");
  
    return (
      <section className="py-8">
        <h3 className="text-2xl font-semibold text-center text-burgundy mb-4">
          Detection Comparison
        </h3>
        <div className="flex flex-wrap gap-10 justify-center mb-6">
          {Object.keys(detectionModels).map((model) => (
            <button
              key={model}
              onClick={() => setSelectedModel(model)}
              className={`px-10 py-3 rounded-full text-m font-semibold transition ${
                selectedModel === model
                  ? "bg-orangebright text-white"
                  : "bg-burgundy text-white hover:bg-orangebright"
              }`}
            >
              {model}
            </button>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <img
              src={detectionModels[selectedModel].labels}
              alt={`${selectedModel} ground truth labels`}
              className="w-full max-w-xl h-auto rounded sm"
            />
            <p className="text-md font-semibold text-burgundy mb-2 text-center">Ground Truth</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={detectionModels[selectedModel].prediction}
              alt={`${selectedModel} detection predictions`}
              className="w-full max-w-xl h-auto rounded sm"
            />
            <p className="text-center mt-2 text-sm">Detection Prediction</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default DetectionComparison;