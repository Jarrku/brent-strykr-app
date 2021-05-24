export const navbarQuery = `
  *[_id == "navbar"][0] {
    "icon": {
      "url": icon.asset->url,
      "alt": icon.alt
    },
    "links": links[] -> {
      label,
      url,
      baseUrl
    }
  }
`;

export type WithNavbar<T> = T & { navbar: INavbar };

export interface INavbar {
  icon: Icon;
  links: Link[];
}

interface Icon {
  alt: string;
  url: string;
}

interface Link {
  baseUrl: string;
  label: string;
  url: string;
}
