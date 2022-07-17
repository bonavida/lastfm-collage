import { useLayoutEffect, forwardRef, ForwardedRef } from 'react';
/** Types */
import { CanvasDimensions } from '@customTypes/collage';
/** Styles */
import styles from './Canvas.module.scss';

interface CanvasProps {
  dimensions: CanvasDimensions;
  className?: string;
  onDraw: (ref: ForwardedRef<HTMLCanvasElement>) => void;
}

const Canvas = (
  { dimensions, className = '', onDraw }: CanvasProps,
  ref: ForwardedRef<HTMLCanvasElement>
) => {
  useLayoutEffect(() => {
    onDraw && onDraw(ref);
  }, []);

  return (
    <canvas
      ref={ref}
      width={dimensions.width}
      height={dimensions.height}
      className={`${styles.canvas} ${className}`}
    />
  );
};

export default forwardRef(Canvas);
