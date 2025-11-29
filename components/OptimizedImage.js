import NextImage from 'next/image';

/**
 * Optimized Image component using next/image
 * Provides automatic lazy loading, responsive sizing, and better Core Web Vitals
 * 
 * For static exports (output: 'export'), images are unoptimized but still benefit from:
 * - Proper width/height to prevent CLS (Cumulative Layout Shift)
 * - Native lazy loading
 * - Responsive sizing hints
 */

export const OptimizedImage = ({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  priority = false,
  className = '',
  style = {},
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props 
}) => {
  // Handle external URLs vs local paths
  const isExternal = src?.startsWith('http');
  
  // For fill mode, we need a container with position relative
  if (fill) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
        <NextImage
          src={src}
          alt={alt || ''}
          fill
          sizes={sizes}
          priority={priority}
          className={className}
          style={{ objectFit: 'cover' }}
          {...props}
        />
      </div>
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      sizes={sizes}
      style={{ 
        maxWidth: '100%', 
        height: 'auto',
        ...style 
      }}
      {...props}
    />
  );
};

/**
 * Hero/Banner image - larger priority image for above the fold
 */
export const HeroImage = ({ src, alt, ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={1200}
    height={630}
    priority={true}
    sizes="100vw"
    {...props}
  />
);

/**
 * Thumbnail image - smaller images for cards, lists
 */
export const ThumbnailImage = ({ src, alt, ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={400}
    height={250}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
    {...props}
  />
);

/**
 * Logo image - typically small, can be priority for header
 */
export const LogoImage = ({ src, alt, width = 150, height = 50, priority = true, ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={width}
    height={height}
    priority={priority}
    sizes={`${width}px`}
    {...props}
  />
);

/**
 * Product image - for e-commerce cards
 */
export const ProductImage = ({ src, alt, ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={300}
    height={300}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
    {...props}
  />
);

export default OptimizedImage;
