export interface Breed {
  id: number;
  name: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  country_code?: string;
  reference_image_id?: string;
  image?: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
}
