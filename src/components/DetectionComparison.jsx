import React, {useState} from "react";
import ClickableImage from "./ClickableImage";


const detectionModels = {
  "Yolov8s": {
    labels: "/images/detectionresults/YOLOv8s/labels.jpg",
    prediction: "/images/detectionresults/YOLOv8s/prediction.jpg",
    description: (
        <>
          Our baseline YOLOv8s model closely replicated the results reported by
          <a href="https://ceur-ws.org/Vol-3658/paper21.pdf" className="text-blue-500"> Nguyen et al. </a>  on the same dataset. Our model achieved a Precision of 0.608 and recall of 0.582 demonstrating that the model correctly identified most sperm instances but still produced a moderate number of false positives and missed detections.  
            The mAP@0.5 score of 0.532 indicates decent localization accuracy, though the relatively low performance at higher IoU thresholds (reflected in mAP@0.5:0.95) suggests that bounding box alignment could be improved. These limitations are explored further in the following section.
        </>
      )
  },
  "Yolov8s + P2": {
    labels: "/images/detectionresults/YOLOv8s_P2/labels.jpg",
    prediction: "/images/detectionresults/YOLOv8s_P2/prediction.jpg",
    description:(
        <>
          The addition of the <strong>P2 layer</strong> was hypothesized to improve small object detection by reducing the stride and creating a finer-grained feature map. 
          However, further investigation revealed that the majority of bounding box sizes for sperm in the dataset were around <strong>16x16 pixels</strong>, 
          which already falls within the <strong>P3 convolutional layer</strong> of YOLOv8’s feature pyramid. As a result, P2 did not provide significant improvements.
        </>
    ),
  },
  "Yolov8s + Focus": {
    labels: "/images/detectionresults/YOLOv8s_focus/labels.jpg",
    prediction: "/images/detectionresults/YOLOv8s_focus/prediction.jpg",
    description:( 
    <>
    The Focus layer, designed to preserve spatial detail, showed no measurable gains across any metric: Precision (0.600), Recall (0.549), mAP@0.5 (0.450), and mAP@0.5:0.95 (0.185).  
    Both our baseline YOLOv8s model and the results reported by{" "}
    <a
      href="https://ceur-ws.org/Vol-3658/paper21.pdf"
      className="text-blue-500 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      Nguyen et al.
    </a>{" "}
    suggest that the original YOLOv8 architecture may already extract spatial features from this dataset to the extent that its design allows. The lack of improvement from additional Focus layers indicates that further architectural modifications may offer diminishing returns, and that performance limitations could stem more from dataset characteristics or the inherent difficulty of the task rather than from model design.
    Exploring alternative backbone architectures—such as ResNet variants—or detection heads tailored for dense, small-object tracking could be a more promising direction.
  </>
    )
  },
  "Yolov11s": {
    labels: "/images/detectionresults/YOLOv11s/labels.jpg",
    prediction: "/images/detectionresults/YOLOv11s/prediction.jpg",
    description: (
        <>
        YOLOv11 produced the second weakest performance across all metrics (with the exception of YOLOv5s reported by the original dataset paper published by <a href="https://www.nature.com/articles/s41597-023-02173-4" className="text-blue-500"> Thambawita et al.</a>).
        YOLOv11s achieved a precision of 0.539, recall of 0.548, mAP@0.5 of 0.444, and mAP@0.5:0.95 of 0.142. The YOLOv11 model is the newest model released by<a href="https://www.nature.com/articles/s41597-023-02173-4" className="text-blue-500"> Ultralytics </a> and is designed to offer faster training and inference times. 
        While this design reduces computational complexity and may perform well in real-time applications, it appears to sacrifice some detection accuracy—particularly for small and dense objects like sperm. The lower mAP scores suggest that the simplified architecture may struggle to extract and aggregate high-resolution spatial features necessary for precise localization in this task.
        </>
    ) ,
  },
};

const DetectionComparison = () => {
    const [selectedModel, setSelectedModel] = useState("Yolov8s");
  
    return (
      <section className="py-8">
        <h3 className="text-2xl font-semibold text-center text-burgundy mb-6">
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
          
          <div className="flex flex-col items-center mt-6">
            <ClickableImage
              src={detectionModels[selectedModel].labels}
              alt={`${selectedModel} ground truth labels`}
              className="w-full max-w-xl h-auto rounded-sm"
            />
            <p className="text-md font-semibold text-burgundy mt-6 text-center">Ground Truth</p>
          </div>
          <div className="flex flex-col items-center mt-6">
            <ClickableImage
              src={detectionModels[selectedModel].prediction}
              alt={`${selectedModel} detection predictions`}
              className="w-full max-w-xl h-auto rounded-sm"
            />
            <p className="text-md font-semibold text-burgundy mt-6 text-center">Val Prediction</p>
          </div>
        </div>
        <p className="mt-4 text-lg text-burgundy text-lg">
        {detectionModels[selectedModel].description}
      </p>
      </section>
    );
  };
  
  export default DetectionComparison;