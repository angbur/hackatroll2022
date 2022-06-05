import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import React from 'react';

const ObjectDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetectorContainer = styled.div`
  min-width: 200px;
  height: 200px;
  border: 3px solid #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TargetImg = styled.img`
  height: 100%;
`;

const TargetBox = styled.div`
  position: absolute;
  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  border: 4px solid #F76F8E;
  background-color: transparent;
  z-index: 20;
  &::before {
    content: "${({ classType, score }) => `${classType} ${score.toFixed(1)}%`}";
    color: #F76F8E;
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`;

const ObjectDetector = (props) => {
    const imageRef = useRef();
    const [imgData, setImgData] = useState(props.imageElement);
    const [predictions, setPredictions] = useState([]);

    const isEmptyPredictions = !predictions || predictions.length === 0;

    const normalizePredictions = (predictions, imgSize) => {
        if (!predictions || !imgSize || !imageRef) return predictions || [];
        return predictions.map((prediction) => {
          const { bbox } = prediction;
          const oldX = bbox[0];
          const oldY = bbox[1];
          const oldWidth = bbox[2];
          const oldHeight = bbox[3];
    
          const imgWidth = imageRef.current.width;
          const imgHeight = imageRef.current.height;
    
          const x = (oldX * imgWidth) / imgSize.width;
          const y = (oldY * imgHeight) / imgSize.height;
          const width = (oldWidth * imgWidth) / imgSize.width;
          const height = (oldHeight * imgHeight) / imgSize.height;
    
          return { ...prediction, bbox: [x, y, width, height] };
        });
      };


    const detectObjectsOnImage = async (imageElement, imgSize) => {
        const model = await cocoSsd.load({});
        const predictions = await model.detect(imageElement, 6);
        const normalizedPredictions = normalizePredictions(predictions, imgSize);
        setPredictions(normalizedPredictions);
      };

      const imgSize = {
        width: imgData.width,
        height: imgData.height,
      };

      useEffect(()=>{
        if (imgData) {
            detectObjectsOnImage(imgData, imgSize);
        }
      },[imgData]);

    return (
        <ObjectDetectorContainer>
        <DetectorContainer>
            {imgData && <TargetImg src={imgData} ref={imageRef} />}
            {!isEmptyPredictions &&
            predictions.map((prediction, idx) => (
                <TargetBox
                key={idx}
                x={prediction.bbox[0]}
                y={prediction.bbox[1]}
                width={prediction.bbox[2]}
                height={prediction.bbox[3]}
                classType={prediction.class}
                score={prediction.score * 100}
                />
            ))}
        </DetectorContainer>
    </ObjectDetectorContainer>
    )
}

export default ObjectDetector;