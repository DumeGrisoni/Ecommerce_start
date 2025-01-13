import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';

const ImageMagnifier = ({ imageUrl }: { imageUrl: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const windowHeight = Dimensions.get('window').height;
  const magnifierHeight = windowHeight * 0.8;
  const magnifierSize = 200;
  const magnifierHalfSize = magnifierSize / 2;

  const magnifierLeft = Math.max(
    Math.min(cursorPosition.x - magnifierHalfSize, 500 - magnifierSize),
    0
  );
  const magnifierTop = Math.max(
    Math.min(
      cursorPosition.y - magnifierHalfSize,
      magnifierHeight - magnifierSize
    ),
    0
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
    setPosition({ x, y });
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div
      style={{ ...styles.imageMagnifierContainer, height: magnifierHeight }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        alt="Image Zoomable"
      />
      {showMagnifier && (
        <div
          style={{
            ...styles.magnifier,

            left: magnifierLeft,
            top: magnifierTop,
          }}
          className="border border-slate-300 rounded-md"
        >
          <div
            style={{
              ...styles.magnifierImage,

              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  imageMagnifierContainer: {
    position: 'relative',
    width: 400,
    maxHeight: 500,
    overflow: 'hidden',
    borderWidth: 1,
    cursor: 'crosshair',
    marginTop: 30,
    zIndex: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'relative',
  },
  magnifier: {
    position: 'absolute',
    width: 200,
    height: 200,
    overflow: 'hidden',
    zIndex: 10,
    pointerEvents: 'none',
  },
  magnifierImage: {
    width: '100%',
    height: '100%',
    backgroundSize: '500% 500%',
    zIndex: 10, // Adjust this value based on your zoom level
  },
});

export default ImageMagnifier;
