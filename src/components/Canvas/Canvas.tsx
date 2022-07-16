import { useRef, useLayoutEffect } from 'react';
/** Types */
import { CanvasDimensions } from '@customTypes/collage';
/** Styles */
import styles from './Canvas.module.scss';

interface CanvasProps {
  dimensions: CanvasDimensions;
  className?: string;
  onDraw: (context: CanvasRenderingContext2D | null) => void;
}

const Canvas = ({ dimensions, className = '', onDraw }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    onDraw && onDraw(context);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={`${styles.canvas} ${className}`}
    />
  );
};

export default Canvas;
