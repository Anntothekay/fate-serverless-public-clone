export interface Article {
  id: string;
  title?: string;
  author?: string;
  text?: string;
  teaser?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPublished?: boolean;
}
