import sharp from 'sharp';

export interface ImageResult {
  url: string;
  width: number;
  height: number;
  size: number;
  format: string;
}

export class ImageHandler {
  private static readonly DEFAULT_IMAGES = {
    TRAINING_CAMP: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center', // Cyclist training
    CYCLING_HOLIDAY: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop&crop=center', // Scenic cycling
    WEEKEND_GETAWAY: 'https://images.unsplash.com/photo-1544191696-15693c62e1b4?w=800&h=400&fit=crop&crop=center', // Mountain biking
    TOUR: 'https://images.unsplash.com/photo-1517654443271-14c4e7b6a20b?w=800&h=400&fit=crop&crop=center', // Group cycling tour
    EXPEDITION: 'https://images.unsplash.com/photo-1544266503-7ad532c8e936?w=800&h=400&fit=crop&crop=center', // Adventure cycling
  };

  private static readonly COUNTRY_IMAGES = {
    'Switzerland': 'https://images.unsplash.com/photo-1527095655060-4026c4af2b25?w=800&h=400&fit=crop&crop=center',
    'Austria': 'https://images.unsplash.com/photo-1551262235-3c533c64e7ab?w=800&h=400&fit=crop&crop=center',
    'Italy': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=400&fit=crop&crop=center',
    'France': 'https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?w=800&h=400&fit=crop&crop=center',
    'Spain': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=400&fit=crop&crop=center',
    'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop&crop=center',
    'Netherlands': 'https://images.unsplash.com/photo-1534351450181-ea58bf205b9e?w=800&h=400&fit=crop&crop=center',
    'Belgium': 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&h=400&fit=crop&crop=center',
    'Denmark': 'https://images.unsplash.com/photo-1568649084754-65fc5c6a8ecb?w=800&h=400&fit=crop&crop=center',
    'Norway': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center',
    'Sweden': 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=400&fit=crop&crop=center',
    'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop&crop=center',
    'Portugal': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=400&fit=crop&crop=center',
    'Czech Republic': 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=400&fit=crop&crop=center',
    'Poland': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center',
    'Croatia': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=400&fit=crop&crop=center',
    'Slovenia': 'https://images.unsplash.com/photo-1578439297738-9ed1b170b5ce?w=800&h=400&fit=crop&crop=center',
    'Greece': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=400&fit=crop&crop=center'
  };

  /**
   * Get appropriate image for event based on type and country
   */
  static getDefaultImage(eventType: string, country?: string): string {
    // Try country-specific image first
    if (country && this.COUNTRY_IMAGES[country as keyof typeof this.COUNTRY_IMAGES]) {
      return this.COUNTRY_IMAGES[country as keyof typeof this.COUNTRY_IMAGES];
    }
    
    // Fall back to event type image
    return this.DEFAULT_IMAGES[eventType as keyof typeof this.DEFAULT_IMAGES] || 
           this.DEFAULT_IMAGES.CYCLING_HOLIDAY;
  }

  /**
   * Validate if an image URL is accessible and returns valid image
   */
  static async validateImage(imageUrl: string): Promise<ImageResult | null> {
    try {
      const response = await fetch(imageUrl, { 
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.ok) return null;

      const contentType = response.headers.get('content-type');
      if (!contentType?.startsWith('image/')) return null;

      const contentLength = response.headers.get('content-length');
      const size = contentLength ? parseInt(contentLength) : 0;

      // Basic validation - reasonable image size
      if (size > 10 * 1024 * 1024) return null; // Max 10MB

      return {
        url: imageUrl,
        width: 0, // Will be determined when actually loading
        height: 0,
        size,
        format: contentType.split('/')[1]
      };
    } catch (error) {
      console.error('Image validation failed:', error);
      return null;
    }
  }

  /**
   * Scrape images from event source URLs
   */
  static async scrapeEventImage(sourceUrl: string): Promise<string | null> {
    try {
      const response = await fetch(sourceUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.ok) return null;

      const html = await response.text();
      
      // Look for Open Graph image
      const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (ogImageMatch) {
        const imageUrl = ogImageMatch[1];
        const validated = await this.validateImage(imageUrl);
        if (validated) return imageUrl;
      }

      // Look for Twitter Card image
      const twitterImageMatch = html.match(/<meta name="twitter:image" content="([^"]+)"/);
      if (twitterImageMatch) {
        const imageUrl = twitterImageMatch[1];
        const validated = await this.validateImage(imageUrl);
        if (validated) return imageUrl;
      }

      // Look for schema.org image
      const schemaMatch = html.match(/"image"\s*:\s*"([^"]+)"/);
      if (schemaMatch) {
        const imageUrl = schemaMatch[1];
        const validated = await this.validateImage(imageUrl);
        if (validated) return imageUrl;
      }

      // Look for first large image in content
      const imgMatches = html.match(/<img[^>]+src="([^"]+)"[^>]*>/g);
      if (imgMatches) {
        for (const imgMatch of imgMatches.slice(0, 5)) { // Check first 5 images
          const srcMatch = imgMatch.match(/src="([^"]+)"/);
          if (srcMatch) {
            const imageUrl = this.resolveUrl(srcMatch[1], sourceUrl);
            const validated = await this.validateImage(imageUrl);
            if (validated && validated.size > 50000) { // At least 50KB (likely not an icon)
              return imageUrl;
            }
          }
        }
      }

      return null;
    } catch (error) {
      console.error('Image scraping failed:', error);
      return null;
    }
  }

  /**
   * Resolve relative URLs to absolute URLs
   */
  private static resolveUrl(url: string, baseUrl: string): string {
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    if (url.startsWith('/')) {
      const urlObj = new URL(baseUrl);
      return `${urlObj.protocol}//${urlObj.host}${url}`;
    }
    return new URL(url, baseUrl).href;
  }

  /**
   * Get optimized image URL using Vercel Image Optimization
   */
  static getOptimizedImageUrl(imageUrl: string, width = 800, height = 400, quality = 75): string {
    // For external images, use Vercel's image optimization
    const params = new URLSearchParams({
      url: imageUrl,
      w: width.toString(),
      h: height.toString(),
      q: quality.toString(),
      fit: 'crop'
    });
    
    return `/_next/image?${params}`;
  }

  /**
   * Generate multiple image sizes for responsive loading
   */
  static generateImageSizes(baseUrl: string) {
    return {
      thumbnail: this.getOptimizedImageUrl(baseUrl, 300, 200),
      card: this.getOptimizedImageUrl(baseUrl, 800, 400),
      hero: this.getOptimizedImageUrl(baseUrl, 1200, 600),
      original: baseUrl
    };
  }

  /**
   * Upload image to Vercel Blob storage (for future use)
   */
  static async uploadToBlob(imageUrl: string, filename: string): Promise<string | null> {
    try {
      // This would use @vercel/blob in production
      // For now, return the original URL
      return imageUrl;
    } catch (error) {
      console.error('Upload to blob failed:', error);
      return null;
    }
  }

  /**
   * Complete image processing pipeline
   */
  static async processEventImage(
    sourceUrl: string | null,
    eventType: string,
    country?: string,
    title?: string
  ): Promise<{
    coverImage: string;
    images: string[];
    hasOriginalImage: boolean;
  }> {
    let coverImage: string;
    let hasOriginalImage = false;
    const images: string[] = [];

    // Try to scrape original image from source
    if (sourceUrl) {
      const scrapedImage = await this.scrapeEventImage(sourceUrl);
      if (scrapedImage) {
        coverImage = scrapedImage;
        images.push(scrapedImage);
        hasOriginalImage = true;
      }
    }

    // Fallback to default image if no original found
    if (!hasOriginalImage) {
      coverImage = this.getDefaultImage(eventType, country);
      images.push(coverImage);
    }

    return {
      coverImage,
      images,
      hasOriginalImage
    };
  }
}

// Export types
export type EventType = 'TRAINING_CAMP' | 'CYCLING_HOLIDAY' | 'WEEKEND_GETAWAY' | 'TOUR' | 'EXPEDITION';