export enum Category {
  ALL = 'All',
  RESUME = 'Resume',
  BUSINESS_CARD = 'Business Card',
  SOCIAL_MEDIA = 'Social Media',
  PROFESSIONAL_PHOTO = 'Professional Photos'
}

export interface TemplateItem {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  tags: string[];
  dimensions?: string; // e.g., "A4", "1080x1080"
}

export interface AIResponseState {
  isLoading: boolean;
  content: string | null;
  error: string | null;
}