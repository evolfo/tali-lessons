/**
 * Netlify Image CDN Loader for next/image
 * 
 * This loader transforms image URLs to use Netlify's Image CDN
 * which provides automatic optimization, resizing, and format conversion.
 * 
 * Documentation: https://docs.netlify.com/image-cdn/overview/
 */

export default function netlifyLoader({ src, width, quality }) {
  // In development, just return the original source
  if (process.env.NODE_ENV === 'development') {
    return src;
  }

  // For local images, construct Netlify Image CDN URL
  if (src.startsWith('/')) {
    const params = new URLSearchParams({
      url: src,
      w: width.toString(),
      q: (quality || 75).toString(),
    });
    return `/.netlify/images?${params.toString()}`;
  }
  
  // For external images that are in the allowed list
  if (src.startsWith('http')) {
    const params = new URLSearchParams({
      url: src,
      w: width.toString(),
      q: (quality || 75).toString(),
    });
    return `/.netlify/images?${params.toString()}`;
  }
  
  return src;
}
