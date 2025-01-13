import { useState } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  GestureResponderEvent,
} from 'react-native';
import { Button, ButtonIcon } from './ui/button';
import { ZoomIn } from 'lucide-react-native';

const ImageMagnifier = ({ imageUrl }: { imageUrl: string }) => {
  //----------Hooks----------------

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  //----------Variables----------------

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const magnifierHeight = windowHeight * 0.8;
  const magnifierSize = 150;
  const magnifierHalfSize = magnifierSize / 2;

  const magnifierLeft = Math.max(
    Math.min(cursorPosition.x - magnifierHalfSize, windowWidth - magnifierSize),
    0
  );
  const magnifierTop = Math.max(
    Math.min(
      cursorPosition.y - magnifierHalfSize,
      magnifierHeight - magnifierSize
    ),
    0
  );

  //----------Functions----------------

  const handleMouseMove = (e: GestureResponderEvent) => {
    if (!isMagnifierEnabled) return;
    const { locationX, locationY } = e.nativeEvent;
    const x = (locationX / e.nativeEvent.pageX) * 100;
    const y = (locationY / e.nativeEvent.pageY) * 100;
    setCursorPosition({ x: locationX, y: locationY });
    setPosition({ x, y });
    setShowMagnifier(true);
  };

  const handleTouchLeave = () => {
    setShowMagnifier(false);
  };

  //----------Render----------------

  return (
    <View
      style={{
        ...styles.imageMagnifierContainer,
        height: magnifierHeight,
      }}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleTouchLeave}
      className="border border-slate-300 rounded-md"
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        alt="Image Zoomable"
      />
      <Button
        style={styles.toggleButton}
        onPress={() => setIsMagnifierEnabled(!isMagnifierEnabled)}
        action={isMagnifierEnabled ? 'secondary' : 'primary'}
      >
        <ButtonIcon as={ZoomIn} />
      </Button>

      {showMagnifier && (
        <View
          style={{
            ...styles.magnifier,
            left: magnifierLeft,
            top: magnifierTop,
          }}
          className="border border-slate-300 rounded-md"
        >
          <Image
            source={{ uri: imageUrl }}
            style={[
              styles.magnifierImage,
              {
                top: -cursorPosition.y * 2,
                left: -cursorPosition.x * 2,
              },
            ]}
            className="rounded-md"
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  imageMagnifierContainer: {
    position: 'relative',
    width: '95%',
    margin: 'auto',
    overflow: 'hidden',
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
    position: 'absolute',
    width: 800, // 2x the size of the container to create the zoom effect
    height: 1100, // 2x the size of the container to create the zoom effect
  },
  toggleButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 20,
  },
});

export default ImageMagnifier;
