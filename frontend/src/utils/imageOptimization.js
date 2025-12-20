/**
 * Image Optimization Utilities for ToolsHub
 * Implements lazy loading, WebP conversion, and responsive images
 */

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (imagePath, sizes = [320, 640, 960, 1280, 1920]) => {
  const extension = imagePath.split('.').pop();
  const basePath = imagePath.replace(`.${extension}`, '');
  
  return sizes
    .map(size => `${basePath}-${size}w.${extension} ${size}w`)
    .join(', ');
};

/**
 * Get optimal image format based on browser support
 */
export const getOptimalFormat = () => {
  // Check WebP support
  const webpSupport = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
  
  if (webpSupport) return 'webp';
  
  // Check AVIF support (modern browsers)
  const avifSupport = document.createElement('canvas')
    .toDataURL('image/avif')
    .indexOf('data:image/avif') === 0;
  
  if (avifSupport) return 'avif';
  
  return 'jpg'; // Fallback
};

/**
 * Lazy load image with Intersection Observer
 */
export const lazyLoadImage = (imageElement) => {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading
    imageElement.loading = 'lazy';
  } else {
    // Fallback with Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    imageObserver.observe(imageElement);
  }
};

/**
 * Preload critical images
 */
export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Convert image to WebP client-side (if needed)
 */
export const convertToWebP = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), {
              type: 'image/webp'
            }));
          },
          'image/webp',
          0.9 // Quality
        );
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Optimize image component props
 */
export const getOptimizedImageProps = (src, alt, sizes = '100vw') => {
  const format = getOptimalFormat();
  const srcWebP = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const srcAvif = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  
  return {
    src,
    alt,
    loading: 'lazy',
    decoding: 'async',
    sizes,
    ...(format === 'webp' && { 'data-webp': srcWebP }),
    ...(format === 'avif' && { 'data-avif': srcAvif })
  };
};

/**
 * Picture element generator for modern image formats
 */
export const generatePictureElement = (src, alt, className = '') => {
  const basePath = src.replace(/\.[^.]+$/, '');
  
  return `
    <picture>
      <source srcset="${basePath}.avif" type="image/avif">
      <source srcset="${basePath}.webp" type="image/webp">
      <img src="${src}" alt="${alt}" class="${className}" loading="lazy" decoding="async">
    </picture>
  `;
};

// React component for optimized images
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false 
}) => {
  const basePath = src.replace(/\.[^.]+$/, '');
  
  return (
    <picture>
      <source srcSet={`${basePath}.avif`} type="image/avif" />
      <source srcSet={`${basePath}.webp`} type="image/webp" />
      <img 
        src={src} 
        alt={alt} 
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
};
