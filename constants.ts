import { Category, TemplateItem } from './types';

// Using specific picsum seeds to simulate different design vibes
export const TEMPLATE_DATA: TemplateItem[] = [
  // --- RESUMES ---
  {
    id: 'res-canva-1',
    title: 'Modern Beige Minimalist Resume',
    category: Category.RESUME,
    description: 'A clean, aesthetic layout using warm beige tones and serif typography. Perfect for lifestyle, fashion, and marketing professionals.',
    imageUrl: 'https://picsum.photos/seed/beige_resume_v1/600/850',
    tags: ['minimal', 'modern', 'light', 'fashion', 'clean'],
    dimensions: 'A4'
  },
  {
    id: 'res-canva-2',
    title: 'Navy & Gold Corporate Executive',
    category: Category.RESUME,
    description: 'Professional deep navy background with gold header accents. commanding and authoritative, ideal for C-level executives and finance.',
    imageUrl: 'https://picsum.photos/seed/navy_gold_res/600/850',
    tags: ['professional', 'corporate', 'dark', 'finance', 'navy'],
    dimensions: 'Letter'
  },
  {
    id: 'res-canva-3',
    title: 'Creative Infographic CV',
    category: Category.RESUME,
    description: 'Visual-heavy layout with skill bars, timeline icons, and a bold sidebar. great for graphic designers and developers showcasing data.',
    imageUrl: 'https://picsum.photos/seed/infographic_res/600/850',
    tags: ['creative', 'infographic', 'colorful', 'design', 'visual'],
    dimensions: 'A4'
  },
  {
    id: 'res-canva-4',
    title: 'Simple Black & White Academic',
    category: Category.RESUME,
    description: 'Strictly professional, text-focused layout. Serif fonts, high readability, suitable for academic, legal, or medical CVs.',
    imageUrl: 'https://picsum.photos/seed/bw_academic/600/850',
    tags: ['professional', 'minimal', 'academic', 'black-white', 'traditional'],
    dimensions: 'Letter'
  },
  {
    id: 'res-canva-5',
    title: 'Tech Startup "Dark Mode" Resume',
    category: Category.RESUME,
    description: 'Sleek dark charcoal background with neon green accents. Targets software engineers and gaming industry professionals.',
    imageUrl: 'https://picsum.photos/seed/dark_mode_res/600/850',
    tags: ['modern', 'tech', 'dark', 'creative', 'neon'],
    dimensions: 'A4'
  },
  {
    id: 'res-canva-6',
    title: 'Boho Chic Creative Resume',
    category: Category.RESUME,
    description: 'Earthy tones, organic shapes, and soft typography. Ideal for artists, florists, and wellness coaches.',
    imageUrl: 'https://picsum.photos/seed/boho_res/600/850',
    tags: ['creative', 'artistic', 'light', 'organic', 'soft'],
    dimensions: 'A4'
  },

  // --- BUSINESS CARDS ---
  {
    id: 'bc-canva-1',
    title: 'Luxury Marble & Gold Card',
    category: Category.BUSINESS_CARD,
    description: 'Elegant white marble texture background with gold foil-style typography. High-end look for real estate and beauty.',
    imageUrl: 'https://picsum.photos/seed/marble_card/600/350',
    tags: ['professional', 'luxury', 'light', 'gold', 'elegant'],
    dimensions: '3.5" x 2"'
  },
  {
    id: 'bc-canva-2',
    title: 'Matte Black Minimalist Card',
    category: Category.BUSINESS_CARD,
    description: 'Premium matte black card with spot UV gloss text. The ultimate modern networking tool for professionals.',
    imageUrl: 'https://picsum.photos/seed/matte_black_card/600/350',
    tags: ['modern', 'dark', 'minimal', 'sleek', 'premium'],
    dimensions: '3.5" x 2"'
  },
  {
    id: 'bc-canva-3',
    title: 'Holographic Gradient Tech Card',
    category: Category.BUSINESS_CARD,
    description: 'Futuristic iridescent gradient background. Eye-catching and trendy, perfect for tech startups and influencers.',
    imageUrl: 'https://picsum.photos/seed/holo_card/600/350',
    tags: ['creative', 'modern', 'colorful', 'tech', 'trendy'],
    dimensions: '3.5" x 2"'
  },
  {
    id: 'bc-canva-4',
    title: 'Kraft Paper Eco-Friendly Card',
    category: Category.BUSINESS_CARD,
    description: 'Simulated brown kraft paper texture with green leaf illustrations. Sustainable vibe for organic brands.',
    imageUrl: 'https://picsum.photos/seed/kraft_card/600/350',
    tags: ['minimal', 'eco', 'organic', 'rustic', 'textured'],
    dimensions: '3.5" x 2"'
  },
  {
    id: 'bc-canva-5',
    title: 'Clean White QR Code Networking',
    category: Category.BUSINESS_CARD,
    description: 'Stark white card featuring a large central QR code and social handles. Designed for quick digital connection.',
    imageUrl: 'https://picsum.photos/seed/qr_card/600/350',
    tags: ['minimal', 'modern', 'light', 'networking', 'digital'],
    dimensions: '3.5" x 2"'
  },

  // --- SOCIAL MEDIA ---
  {
    id: 'sm-canva-1',
    title: 'Aesthetic Instagram Story Quote',
    category: Category.SOCIAL_MEDIA,
    description: 'Soft pastel gradient background with elegant serif typography for daily inspirational quotes.',
    imageUrl: 'https://picsum.photos/seed/story_quote/600/1067',
    tags: ['modern', 'instagram-story', 'light', 'aesthetic', 'pastel'],
    dimensions: '1080x1920'
  },
  {
    id: 'sm-canva-2',
    title: 'Bold Sale Announcement Post',
    category: Category.SOCIAL_MEDIA,
    description: 'High-contrast red and yellow design with massive typography. Optimized to stop the scroll for flash sales.',
    imageUrl: 'https://picsum.photos/seed/sale_post/800/800',
    tags: ['modern', 'marketing', 'bold', 'promotion', 'sale'],
    dimensions: '1080x1080'
  },
  {
    id: 'sm-canva-3',
    title: 'YouTube Thumbnail "Vlog Style"',
    category: Category.SOCIAL_MEDIA,
    description: 'Bright, expressive layout with space for a reaction face cutout, big outline text, and high saturation background.',
    imageUrl: 'https://picsum.photos/seed/yt_vlog/1280/720',
    tags: ['creative', 'youtube', 'thumbnail', 'vlog', 'bright'],
    dimensions: '1280x720'
  },
  {
    id: 'sm-canva-4',
    title: 'Pinterest "How-To" Pin',
    category: Category.SOCIAL_MEDIA,
    description: 'Long vertical layout with multiple steps, photo collage, and clear title overlay. Best for recipes and DIY.',
    imageUrl: 'https://picsum.photos/seed/pin_diy/600/1200',
    tags: ['creative', 'pinterest', 'long-pin', 'diy', 'recipe'],
    dimensions: '1000x1500'
  },
  {
    id: 'sm-canva-5',
    title: 'Modern LinkedIn Carousel Cover',
    category: Category.SOCIAL_MEDIA,
    description: 'Professional slide deck cover design with bold title and arrow cues. Blue and white corporate palette.',
    imageUrl: 'https://picsum.photos/seed/linkedin_carousel/800/800',
    tags: ['professional', 'linkedin', 'business', 'carousel'],
    dimensions: '1080x1080'
  },
  {
    id: 'sm-canva-6',
    title: 'Podcast Cover Art "Retro"',
    category: Category.SOCIAL_MEDIA,
    description: '70s inspired retro font and grainy texture. Cool, artistic vibe for chat or music podcasts.',
    imageUrl: 'https://picsum.photos/seed/podcast_retro/800/800',
    tags: ['creative', 'retro', 'vintage', 'artistic', 'cover'],
    dimensions: '3000x3000'
  },
  {
    id: 'sm-canva-7',
    title: 'We Are Hiring Flyer',
    category: Category.SOCIAL_MEDIA,
    description: 'Clean, geometric layout for job vacancies. clearly organized sections for role, requirements, and apply link.',
    imageUrl: 'https://picsum.photos/seed/hiring_flyer/800/1000',
    tags: ['professional', 'hiring', 'recruitment', 'business', 'flyer'],
    dimensions: 'A5'
  },
  {
    id: 'sm-canva-8',
    title: 'Minimalist Instagram Fashion Post',
    category: Category.SOCIAL_MEDIA,
    description: 'Clean single-image layout with small sans-serif caption. Ideal for fashion brands and influencers.',
    imageUrl: 'https://picsum.photos/seed/fashion_insta/800/800',
    tags: ['minimal', 'instagram-post', 'fashion', 'clean', 'modern'],
    dimensions: '1080x1080'
  },
  {
    id: 'sm-canva-9',
    title: 'New Product Drop Story',
    category: Category.SOCIAL_MEDIA,
    description: 'Urgent, high-energy story layout with "Link in Bio" sticker placement area.',
    imageUrl: 'https://picsum.photos/seed/product_drop/600/1067',
    tags: ['modern', 'instagram-story', 'product', 'marketing', 'bold'],
    dimensions: '1080x1920'
  },
  {
    id: 'sm-canva-10',
    title: 'Educational Carousel Slide',
    category: Category.SOCIAL_MEDIA,
    description: 'Clean layout for educational content with numbered list and swipe arrow. Perfect for coaches and experts.',
    imageUrl: 'https://picsum.photos/seed/edu_carousel/1080/1080',
    tags: ['professional', 'instagram-post', 'carousel', 'educational', 'blue'],
    dimensions: '1080x1080'
  },

  // --- PROFESSIONAL PHOTOS ---
  {
    id: 'ph-canva-1',
    title: 'Scandi Home Office Background',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Bright, airy Scandinavian style workspace with plants and natural light. Perfect for Zoom backgrounds.',
    imageUrl: 'https://picsum.photos/seed/scandi_office/800/500',
    tags: ['minimal', 'zoom-background', 'office', 'interior', 'bright'],
    dimensions: '1920x1080'
  },
  {
    id: 'ph-canva-2',
    title: 'Abstract 3D Gradient Wall',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Soft flowing 3D shapes in purple and blue. A modern, tech-forward background for presentations or headers.',
    imageUrl: 'https://picsum.photos/seed/3d_gradient/800/500',
    tags: ['modern', 'abstract', '3d', 'background', 'gradient'],
    dimensions: 'High Res'
  },
  {
    id: 'ph-canva-3',
    title: 'Product Podium Pastel',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Minimalist product display podium with pastel geometric shapes and soft shadows. Ideal for mockups.',
    imageUrl: 'https://picsum.photos/seed/product_podium/800/500',
    tags: ['minimal', 'product', 'mockup', 'pastel', 'studio'],
    dimensions: 'High Res'
  },
  {
    id: 'ph-canva-4',
    title: 'Cyberpunk City Street',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Neon-lit rainy street scene at night. High energy background for gaming or tech content.',
    imageUrl: 'https://picsum.photos/seed/cyberpunk_city/800/500',
    tags: ['creative', 'cyberpunk', 'neon', 'city', 'night'],
    dimensions: 'High Res'
  },
  {
    id: 'ph-canva-5',
    title: 'Coffee Shop Flat Lay',
    category: Category.PROFESSIONAL_PHOTO,
    description: 'Top-down view of a wooden table with coffee, notebook, and croissant. Cozy lifestyle imagery.',
    imageUrl: 'https://picsum.photos/seed/coffee_flatlay/800/500',
    tags: ['creative', 'lifestyle', 'flatlay', 'coffee', 'cozy'],
    dimensions: 'High Res'
  }
];

export const CATEGORIES = Object.values(Category);
export const STYLES = ['All Styles', 'Modern', 'Minimal', 'Creative', 'Professional', 'Dark', 'Light'];