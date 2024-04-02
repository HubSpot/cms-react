import { useState, useEffect } from 'react';
import styles from '../styles.module.css';
import { styled } from 'styled-components';
import { StyleFields } from '../types.js';
import {
  FontFieldType,
  SpacingFieldType,
} from '@hubspot/cms-components/fields';

type BlogPost = {
  label: string;
  url: string;
  featuredImage: string;
  blogAuthor: {
    name: string;
  };
  publishDate: number;
};

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

function getNextHeadingLevel(headingLevel) {
  const nextHeadingLevel = {
    h1: 'h2',
    h2: 'h3',
    h3: 'h4',
    h4: 'h5',
    h5: 'h6',
    h6: 'h6',
  };

  return nextHeadingLevel[headingLevel];
}

interface FontProps {
  $fontStyle: string;
  $fontHoverStyle?: string;
}

interface SpacingProps {
  $spacingStyle: string;
}

interface BlogPostImageProps {
  featuredImage: string;
}

const BlogPostImage = ({ featuredImage }: BlogPostImageProps) => {
  return (
    <img
      className={styles.hsPostListingImage}
      src={featuredImage}
      data-testid="post-image"
    />
  );
};

const BlogPostTitleLink = styled.a<FontProps & SpacingProps>`
  display: block;
  text-decoration: none;
  ${props => props.$fontStyle}
  ${props => props.$spacingStyle}
  &:hover {
    ${props => props.$fontHoverStyle}
  }
`;

interface BlogPostTitleProps {
  label: string;
  url: string;
  titleStyle: {
    font: FontFieldType;
    hoverFont: FontFieldType;
    spacing: SpacingFieldType;
  };
  headingLevel: HeadingLevel;
}

const BlogPostTitle = ({
  label,
  url,
  titleStyle,
  headingLevel,
}: BlogPostTitleProps) => {
  // This ensures that the titles are always one level below the main heading for SEO purposes.
  const HeadingLevel = getNextHeadingLevel(headingLevel);

  return (
    <HeadingLevel>
      <BlogPostTitleLink
        data-testid="post-title"
        $fontStyle={titleStyle.font.css}
        $fontHoverStyle={titleStyle.hoverFont.css}
        $spacingStyle={titleStyle.spacing.css}
        href={url}
      >
        {label}
      </BlogPostTitleLink>
    </HeadingLevel>
  );
};

const BlogPostAuthorName = styled.span<FontProps>`
  ${props => props.$fontStyle}
`;

interface BlogPostAuthorProps {
  blogAuthor: {
    name: string;
  };
  authorStyle: {
    font: FontFieldType;
  };
}

const BlogPostAuthor = ({ blogAuthor, authorStyle }: BlogPostAuthorProps) => {
  return (
    <BlogPostAuthorName
      data-testid="author-name"
      $fontStyle={authorStyle.font.css}
    >
      {blogAuthor.name}
    </BlogPostAuthorName>
  );
};

const BlogPostPublishTime = styled.time<FontProps>`
  ${props => props.$fontStyle}
`;

interface BlogPostPublishDateProps {
  publishDate: number;
  publishDateStyle: {
    font: FontFieldType;
  };
}

const BlogPostPublishDate = ({
  publishDate,
  publishDateStyle,
}: BlogPostPublishDateProps) => {
  const localeDateString = new Date(publishDate).toLocaleDateString();

  return (
    <BlogPostPublishTime
      data-testid="publish-date"
      $fontStyle={publishDateStyle.font.css}
      dateTime={new Date(publishDate).toISOString()}
    >
      {localeDateString}
    </BlogPostPublishTime>
  );
};

interface ListingBlogPostProps {
  headingLevel: HeadingLevel;
  blogPost: BlogPost;
  groupStyle: StyleFields;
  displayForEachListItem: string[];
}

const ListingBlogPost = ({
  blogPost,
  groupStyle,
  headingLevel,
  displayForEachListItem,
}: ListingBlogPostProps) => {
  const showPostTitle = displayForEachListItem.includes('title');
  const showPostAuthorName = displayForEachListItem.includes('authorName');
  const showPostPublishDate = displayForEachListItem.includes('publishDate');
  const showPostImage = displayForEachListItem.includes('image');
  const { label, url, blogAuthor, publishDate, featuredImage } = blogPost;
  const { groupTitle, groupAuthor, groupPublishDate } = groupStyle;

  return (
    <div data-testid="blog-post" className={styles.hsPostListing}>
      {showPostImage && (
        <div className={styles.hsPostListingFeaturedImage}>
          <BlogPostImage featuredImage={featuredImage} />
        </div>
      )}
      {showPostTitle && (
        <BlogPostTitle
          url={url}
          label={label}
          titleStyle={groupTitle}
          headingLevel={headingLevel}
        />
      )}
      <div className={styles.hsPostListingAuthorDate}>
        {showPostAuthorName && (
          <BlogPostAuthor blogAuthor={blogAuthor} authorStyle={groupAuthor} />
        )}
        {showPostPublishDate && (
          <BlogPostPublishDate
            publishDate={publishDate}
            publishDateStyle={groupPublishDate}
          />
        )}
      </div>
    </div>
  );
};

export default function PostListingIsland({
  headingLevel,
  signedUrl,
  groupStyle,
  displayForEachListItem,
  layout,
}) {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    if (!signedUrl) {
      return;
    }

    const fetchBlogPosts = async () => {
      fetch(signedUrl)
        .then(result => {
          if (!result.ok) {
            throw new Error(`HTTP error. Status: ${result.status}`);
          }
          return result.json();
        })
        .then(data => {
          setBlogPosts(data);
        })
        .catch(error => {
          console.error('Error fetching blog posts:', error);
          setBlogPosts([]);
        });
    };
    fetchBlogPosts();
  }, [signedUrl]);

  return (
    <div className={styles[`hsPostListingWrapper--${layout}`]}>
      {blogPosts.map(blogPost => {
        return (
          <ListingBlogPost
            key={blogPost.url}
            blogPost={blogPost}
            groupStyle={groupStyle}
            headingLevel={headingLevel}
            displayForEachListItem={displayForEachListItem}
          />
        );
      })}
    </div>
  );
}
