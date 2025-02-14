
interface Metadata {
  ip?: string;
  userAgent?: string;
  readReceipt?: boolean;
  trackers?: string[];
}

export const privacyService = {
  // Block read receipts by removing specific headers and tracking pixels
  stripReadReceipts(html?: string): string {
    if (!html) return '';
    
    // Remove tracking pixels
    return html.replace(/<img[^>]*((read-receipt|tracking|beacon))[^>]*>/gi, '');
  },

  // Remove common email trackers
  removeTrackers(html?: string): string {
    if (!html) return '';
    
    const trackerPatterns = [
      /https?:\/\/[^"']*((mailtrack|openrate|litmus|campaign-track))[^"']*/gi,
      /<img[^>]*(mailtrack|openrate|litmus|campaign-track)[^>]*>/gi,
      /<pixel[^>]*>/gi
    ];

    let cleanHtml = html;
    trackerPatterns.forEach(pattern => {
      cleanHtml = cleanHtml.replace(pattern, '');
    });

    return cleanHtml;
  },

  // Strip metadata from email content
  stripMetadata(html?: string): string {
    if (!html) return '';
    
    // Remove meta tags containing sensitive information
    return html
      .replace(/<meta[^>]*>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, ''); // Remove HTML comments that might contain metadata
  },

  // Process email content with all privacy features
  processEmailContent(html?: string): string {
    if (!html) return '';
    
    let processedHtml = html;
    processedHtml = this.stripReadReceipts(processedHtml);
    processedHtml = this.removeTrackers(processedHtml);
    processedHtml = this.stripMetadata(processedHtml);
    
    return processedHtml;
  }
};
