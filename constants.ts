import { Category, TemplateItem } from './types';

// Using picsum seeds to ensure consistent but varied images
export const TEMPLATE_DATA: TemplateItem[] = [
  // Resumes
  {
    id: 'res-1',
    title: 'Minimalist Executive Resume',
    category: Category.RESUME,
    description: 'Clean, whitespace-heavy design suitable for C-level executives.',
    imageUrl: 'https://picsum.photos/seed/resume1/600/850',
    tags: ['minimal', 'executive', 'clean'],
    dimensions: 'A4'
  },
  {
    id: 'res-2',
    title: 'Creative Designer CV',
    category: Category.RESUME,
    description: 'Bold color blocks and skill bars for creative professionals.',
    imageUrl: 'https://picsum.photos/seed/resume2/600/850',
    tags: ['creative', 'colorful', 'modern'],
    dimensions: 'A4'
  },
  {
    id: 'res-3',
    title: 'Academic CV Template',
    category: Category.RESUME,
    description: 'Structured layout focused on publications and research.',
    imageUrl: 'https://picsum.photos/seed/resume3/600/850',
    tags: ['academic', 'formal', 'detailed'],
    dimensions: 'Letter'
  },
  {
    id: 'res-4',
    title: 'Tech Lead Resume',
    category: Category.RESUME,
    description: 'optimized for ATS systems with a focus on technical skills stack.',
    imageUrl: 'https://picsum.photos/seed/resume4/600/850',
    tags: ['tech', 'ats-friendly', 'developer'],
    dimensions: 'A4'
  },
  {
    id: 'res-5',
    title: 'Recent Graduate Entry',
    category: Category.RESUME,
    description: 'Focuses on education and projects for those with less experience.',
    imageUrl: 'https://picsum.photos/seed/resume5/600/850',
    tags: ['student', 'internship', 'entry-level'],
    dimensions: 'A4'
  },

  // Business Cards
  {
    id: 'bc-1',
    title: 'Modern Tech Business Card',
    category: Category.BUSINESS_CARD,
    description: 'Sleek dark mode design with QR code placeholder.',
    imageUrl: 'https://picsum.photos/seed/bizcard1/600/350',
    tags: ['tech', 'dark', 'modern'],
    dimensions: '3.5" x 2"'
  },
  {
    id: 'bc-2',
    title: 'Floral Boutique Card',
    category: Category.BUSINESS_CARD,
    description: 'Elegant floral patterns for lifestyle brands.',
    imageUrl: 'https://picsum.photos/seed/bizcard2/600/350',
    tags: ['floral', 'elegant', 'soft'],
    dimensions: '3.5" x 2"'
  },
  {
    id: 'bc-3',
    title: 'Corporate Minimalist',
    category: Category.BUSINESS_CARD,
    description: 'Trustworthy blue and white design for finance.',
    imageUrl: 'https://picsum.photos/seed/bizcard3/600/350',
    tags: ['corporate', 'finance', 'trust'],
    dimensions: '3.5" x 2"'
  },
  {
    id: 'bc-4',
    title: 'Real Estate Agent',
    category: Category.BUSINESS_CARD,
    description: 'Features a headshot placeholder and gold accents.',
    imageUrl: 'https://picsum.photos/seed/bizcard4/600/350',
    tags: ['real-estate', 'gold', 'luxury'],
    dimensions: '3.5" x 2"'
  },
  {
    id: 'bc-5',
    title: 'Freelance Writer',
    category: Category.BUSINESS_CARD,
    description: 'Typewriter font style with textured background.',
    imageUrl: 'https://picsum.photos/seed/bizcard5/600/350',
    tags: ['retro', 'writer', 'creative'],
    dimensions: '3.5" x 2"'
  },

  // Social Media
  {
    id: 'sm-1',
    title: 'Instagram Product Launch',
    category: Category.SOCIAL_MEDIA,
    description: 'High energy layout for announcing new products.',
    imageUrl: 'https://picsum.photos/seed/insta1/800/800',
    tags: ['instagram', 'square', 'marketing'],
    dimensions: '1080x1080'
  },
  {
    id: 'sm-2',
    title: 'Event Poster / Story',
    category: Category.SOCIAL_MEDIA,
    description: 'Vertical layout for stories and event announcements.',
    imageUrl: 'https://picsum.photos/seed/insta2/600/1067',
    tags: ['story', 'event', 'vertical'],
    dimensions: '1080x1920'
  },
  {
    id: 'sm-3',
    title: 'Motivational Quote Layout',
    category: Category.SOCIAL_MEDIA,
    description: 'Typography focused design for quotes.',
    imageUrl: 'https://picsum.photos/seed/insta3/800/800',
    tags: ['quote', 'typography', 'clean'],
    dimensions: '1080x1080'
  },
  {
    id: 'sm-4',
    title: 'YouTube Thumbnail Pack',
    category: Category.SOCIAL_MEDIA,
    description: 'High contrast text and expressive face placeholders.',
    imageUrl: 'https://picsum.photos/seed/yt1/800/450',
    tags: ['youtube', 'bold', 'clickbait'],
    dimensions: '1280x720'
  },
  {
    id: 'sm-5',
    title: 'LinkedIn Carousel Slide',
    category: Category.SOCIAL_MEDIA,
    description: 'Professional layout for educational carousel posts.',
    imageUrl: 'https://picsum.photos/seed/linkedin1/800/800',
    tags: ['linkedin', 'educational', 'carousel'],
    dimensions: '1080x1080'
  },

  // Photos
  {
    id: 'ph-1',
    title: 'Office Collaboration',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Diverse team working together on a whiteboard.',
    imageUrl: 'https://picsum.photos/seed/photo1/800/500',
    tags: ['team', 'office', 'diverse'],
    dimensions: 'High Res'
  },
  {
    id: 'ph-2',
    title: 'Modern Workspace Setup',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Clean desk setup with laptop and coffee.',
    imageUrl: 'https://picsum.photos/seed/photo2/800/500',
    tags: ['desk', 'tech', 'clean'],
    dimensions: 'High Res'
  },
  {
    id: 'ph-3',
    title: 'Handshake Close-up',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Professional handshake in a corporate setting.',
    imageUrl: 'https://picsum.photos/seed/photo3/800/500',
    tags: ['business', 'deal', 'handshake'],
    dimensions: 'High Res'
  },
  {
    id: 'ph-4',
    title: 'Studio Headshot Background',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Soft blurred office background for professional headshots.',
    imageUrl: 'https://picsum.photos/seed/photo4/800/500',
    tags: ['background', 'blur', 'studio'],
    dimensions: 'High Res'
  },
  {
    id: 'ph-5',
    title: 'Coffee Shop Meeting',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Casual business meeting in a bright cafe.',
    imageUrl: 'https://picsum.photos/seed/photo5/800/500',
    tags: ['casual', 'meeting', 'cafe'],
    dimensions: 'High Res'
  }
];

export const CATEGORIES = Object.values(Category);