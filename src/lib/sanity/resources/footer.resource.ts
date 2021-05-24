export const footerQuery = `
  *[_id == "footer"][0] {
    text,
    "links": links[]{
      type,
      url,
    }
  }
`;

export type WithFooter<T> = T & { footer: IFooter };

export interface IFooter {
  text: string;
  links: ISocialMediaLink[];
}

export interface ISocialMediaLink {
  type: 'instagram' | 'facebook' | 'twitter' | 'linkedin';
  url: string;
}
