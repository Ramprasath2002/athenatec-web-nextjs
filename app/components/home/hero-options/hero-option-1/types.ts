export type MediaType = 'image' | 'video';

export interface CTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface HeroSlideData {
  id: string;
  title: string;
  subtitle: string;
  media: {
    type: MediaType;
    src: string;
    alt?: string;
  };
  ctas?: CTA[];
}

export interface CarouselStat {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface HeroProps {
  slides: HeroSlideData[];
  bottomStats: CarouselStat[];
  bottomDescription?: string;
}
