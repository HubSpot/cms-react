export type BlogPost = {
  id: number;
  name: string;
  absoluteUrl: string;
  featuredImage: string;
  featuredImageAltText: string;
  blogAuthor: {
    name: string;
    displayName: string;
    slug: string;
    avatar: string;
  };
  tagList: [
    {
      name: string;
      slug: string;
    }
  ];
  publishedDate: number;
  publishDateLocalized: {
    date: number;
  };
  postListContent: string;
  parentBlog: {
    absoluteUrl: string;
  };
};
