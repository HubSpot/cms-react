import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { mockBlogPosts } from '../assets/mockData';

import { Component as BlogPosts } from '../index.jsx';

const defaultProps = {
  hublParameters: {
    blogPosts: mockBlogPosts,
  },
  layout: 'grid',
  columns: 3,
  alternateImage: false,
  fullImage: false,
  displayForEachListItem: ['title', 'image', 'authorName', 'authorImage'],
  groupStyle: {
    groupBackgroundImage: {
      spacing: {},
    },
    groupImage: {
      groupSize: {
        width: '25',
      },
      groupSpacing: {
        betweenImageAndContent: '20',
        spacing: {},
      },
      groupCorner: {
        radius: 0,
      },
    },
    groupPost: {
      groupSpacing: {
        spacing: {},
      },
      groupBackground: {},
      groupBorder: {
        border: {},
      },
      groupCorner: {
        radius: 0,
      },
    },
    groupTitle: {
      headingLevel: 'h2',
      groupText: {
        font: {
          color: '',
          size: '16',
          size_unit: 'px',
        },
      },
      groupHover: {
        groupText: {
          font: {
            color: '',
            size: '16',
            size_unit: 'px',
          },
        },
      },
      groupSpacing: {
        spacing: {},
      },
    },
    groupAuthor: {
      groupImage: {
        groupCorner: {
          radius: 0,
        },
      },
      groupText: {
        font: {
          color: '',
          size: '16',
          size_unit: 'px',
        },
      },
      groupHover: {
        groupText: {
          font: {
            color: '',
            size: '16',
            size_unit: 'px',
          },
        },
      },
      groupSpacing: {
        spacing: {},
      },
    },
    groupTags: {
      groupText: {
        font: {},
      },
      groupBorder: {
        border: {},
      },
      groupSpacing: {
        spacing: {},
      },
      groupBackground: {},
      groupCorner: {
        radius: 0,
      },
      groupHover: {
        groupText: {
          font: {},
        },
        groupBorder: {
          border: {},
        },
        groupBackground: {
          color: '',
        },
      },
    },
    groupDescription: {
      groupText: {
        font: {},
      },
      groupSpacing: {
        spacing: {},
      },
    },
    groupButton: {
      groupText: {
        font: {},
      },
      groupBorder: {
        border: {},
      },
      groupCorner: {
        radius: 0,
      },
      groupSpacing: {
        spacing: {},
      },
      groupBackground: {},
      groupHover: {
        groupText: {
          font: {},
        },
        groupBorder: {
          border: {},
        },
        groupBackground: {},
      },
    },
    groupPublishDate: {
      groupText: {
        font: {},
      },
      groupSpacing: {
        spacing: {},
      },
    },
    groupContent: {
      spacing: {},
    },
  },
  groupDefaultText: {
    featuredImageText: 'Featured image text',
  },
};

describe('BlogPosts', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders BlogPosts', () => {
    const { asFragment } = render(<BlogPosts {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when fullImage is set to true', () => {
    it('puts the image as background image', () => {
      render(<BlogPosts {...defaultProps} fullImage={true} />);

      const blogPostsWithBackgroundImage = screen.getAllByTestId(
        'blog-post-with-background-image'
      );
      expect(blogPostsWithBackgroundImage.length).toBe(4);
    });
  });

  describe('when showAuthorImage is false', () => {
    it('does not show the author avatar', () => {
      render(
        <BlogPosts
          {...defaultProps}
          displayForEachListItem={['image', 'title', 'authorName']}
        />
      );

      const blogPostAuthorAvatar = screen.queryAllByTestId('author-avatar');
      expect(blogPostAuthorAvatar.length).toBe(0);
    });
  });

  describe('when showAuthorName is false', () => {
    it('does not show the author name', () => {
      render(
        <BlogPosts
          {...defaultProps}
          displayForEachListItem={['image', 'title', 'authorImage']}
        />
      );

      const blogPostAuthorName = screen.queryAllByTestId('author-name');
      expect(blogPostAuthorName.length).toBe(0);
    });
  });

  describe('when showAuthorImage and showAuthorName are false', () => {
    it('does not render the author section', () => {
      render(
        <BlogPosts
          {...defaultProps}
          displayForEachListItem={['image', 'title']}
        />
      );

      const blogPostAuthorWrapper = screen.queryAllByTestId('author-wrapper');
      expect(blogPostAuthorWrapper.length).toBe(0);
    });
  });

  describe('Grid layout', () => {
    it('properly calculates grid styling when space between posts is present', () => {
      const blogPostWithSpaceBetweenPosts = {
        ...defaultProps,
        groupStyle: {
          ...defaultProps.groupStyle,
          groupPost: {
            groupBorder: {
              border: {},
            },
            groupCorner: {
              radius: 0,
            },
            groupBackground: {},
            groupSpacing: {
              spaceBetweenPosts: '30',
              spacing: {},
            },
          },
        },
      };

      render(<BlogPosts {...blogPostWithSpaceBetweenPosts} />);
      const blogPosts = screen.queryAllByTestId('blog-post');

      const blogPostStyle = blogPosts[0].style;

      expect(blogPostStyle.getPropertyValue('--grid-post-width')).toEqual(
        'calc(50% - 15px)'
      );
      expect(
        blogPostStyle.getPropertyValue('--grid-space-between-posts')
      ).toEqual('30px');
      expect(
        blogPostStyle.getPropertyValue('--grid-post-width-three-column')
      ).toEqual('calc(33.3% - 20px)');
      expect(
        blogPostStyle.getPropertyValue('--grid-post-width-four-column')
      ).toEqual('calc(25% - 22.5px)');
    });

    it('uses a static calcualtion for grid styling when space between posts is not present', () => {
      render(<BlogPosts {...defaultProps} />);
      const blogPosts = screen.queryAllByTestId('blog-post');
      const blogPostStyle = blogPosts[0].style;

      expect(blogPostStyle.getPropertyValue('--grid-post-width')).toEqual(
        'calc(50% - 0.5rem)'
      );
      expect(
        blogPostStyle.getPropertyValue('--grid-space-between-posts')
      ).toEqual('1rem');
      expect(
        blogPostStyle.getPropertyValue('--grid-post-width-three-column')
      ).toEqual('calc(33.3% - 0.66rem)');
      expect(
        blogPostStyle.getPropertyValue('--grid-post-width-four-column')
      ).toEqual('calc(25% - 0.75rem)');
    });
  });

  describe('Side by side layout', () => {
    const blogPostsWithSideBySideLayout = {
      ...defaultProps,
      layout: 'sideBySide',
    };

    it('properly calculates width for image and content when imageWidth and betweenImageAndContent present', () => {
      render(<BlogPosts {...blogPostsWithSideBySideLayout} />);
      const blogPosts = screen.queryAllByTestId('blog-post');
      const blogPostStyle = blogPosts[0].style;

      expect(blogPostStyle.getPropertyValue('--image-wrapper-width')).toEqual(
        'calc(25% - 10px)'
      );
      expect(blogPostStyle.getPropertyValue('--content-wrapper-width')).toEqual(
        'calc(75% - 10px)'
      );
    });

    it('properly calculates width for image and content when only imageWidth is present', () => {
      const blogPostsWithNoSpaceBetweenContent = {
        ...blogPostsWithSideBySideLayout,
        groupStyle: {
          ...defaultProps.groupStyle,
          groupImage: {
            groupSize: {
              width: '25',
            },
            groupCorner: {
              radius: 0,
            },
            groupSpacing: {
              spacing: {},
            },
          },
        },
      };

      render(<BlogPosts {...blogPostsWithNoSpaceBetweenContent} />);
      const blogPosts = screen.queryAllByTestId('blog-post');
      const blogPostStyle = blogPosts[0].style;

      expect(blogPostStyle.getPropertyValue('--image-wrapper-width')).toEqual(
        'calc(25% - 0.5rem)'
      );
      expect(blogPostStyle.getPropertyValue('--content-wrapper-width')).toEqual(
        'calc(75% - 0.5rem)'
      );
    });

    it('properly calculates width for image and content when only betweenImageAndContent is present', () => {
      const blogPostsWithNoImageWidth = {
        ...blogPostsWithSideBySideLayout,
        groupStyle: {
          ...defaultProps.groupStyle,
          groupImage: {
            groupSize: {},
            groupCorner: {
              radius: 0,
            },
            groupSpacing: {
              betweenImageAndContent: '20',
              spacing: {},
            },
          },
        },
      };

      render(<BlogPosts {...blogPostsWithNoImageWidth} />);
      const blogPosts = screen.queryAllByTestId('blog-post');
      const blogPostStyle = blogPosts[0].style;

      expect(blogPostStyle.getPropertyValue('--image-wrapper-width')).toEqual(
        'calc(40% - 10px)'
      );
      expect(blogPostStyle.getPropertyValue('--content-wrapper-width')).toEqual(
        'calc(60% - 10px)'
      );
    });

    it('uses a static calculation when neither imageWidth or betweenImageAndContent are present', () => {
      const blogPostsWithNoImageWidthOrSpaceBetweenContent = {
        ...blogPostsWithSideBySideLayout,
        groupStyle: {
          ...defaultProps.groupStyle,
          groupImage: {
            groupSize: {},
            groupCorner: {
              radius: 0,
            },
            groupSpacing: {
              spacing: {},
            },
          },
        },
      };

      render(<BlogPosts {...blogPostsWithNoImageWidthOrSpaceBetweenContent} />);
      const blogPosts = screen.queryAllByTestId('blog-post');
      const blogPostStyle = blogPosts[0].style;

      expect(blogPostStyle.getPropertyValue('--image-wrapper-width')).toEqual(
        'calc(40% - 0.5rem)'
      );
      expect(blogPostStyle.getPropertyValue('--content-wrapper-width')).toEqual(
        'calc(60% - 0.5rem)'
      );
    });

    it('properly sets the order and margin when imageSide is left', () => {
      render(<BlogPosts {...blogPostsWithSideBySideLayout} />);
      const blogPosts = screen.queryAllByTestId('blog-post-image');
      const leftSideBlogPostStyle = blogPosts[0].style;

      expect(leftSideBlogPostStyle.getPropertyValue('--margin-right')).toEqual(
        '20px'
      );
      expect(leftSideBlogPostStyle.getPropertyValue('--order')).toEqual('1');
    });

    it('properly sets the order and margin when imageSide is right', () => {
      const blogPostsWithAlternatingImage = {
        ...blogPostsWithSideBySideLayout,
        alternateImage: true,
      };

      render(<BlogPosts {...blogPostsWithAlternatingImage} />);
      const blogPosts = screen.queryAllByTestId('blog-post-image');
      const rightSideBlogPostStyle = blogPosts[1].style;

      expect(rightSideBlogPostStyle.getPropertyValue('--margin-left')).toEqual(
        '20px'
      );
      expect(rightSideBlogPostStyle.getPropertyValue('--order')).toEqual('2');
    });
  });
});
