export interface CTA {
  label: string;
  url: string;
}

export interface Media {
  desktop: string; // these are the image URLs
  mobile: string;
}

export interface ResponseType {
  title: string;
  heading: string;
  subhead: string;
  media: Media;
  cta: CTA[];
  ctaPosition: string;
}
