import { useSharedIslandState } from '@hubspot/cms-components';
import styles from '../../styles.module.css';
import { addDescribedBy } from '../../utils/utils.js';

interface BlogPost {
  id: number;
  absoluteUrl: string;
  name: string;
  featuredImage?: string;
  featuredImageAltText?: string;
}

interface A11yImageLinkProps {
  blogPost?: BlogPost;
  groupDefaultText?: {
    featuredImageText?: string;
  };
}

const A11yImageLink: React.FC<A11yImageLinkProps> = ({
  blogPost,
  groupDefaultText,
}) => {
  const [sharedGatedIds] = useSharedIslandState();
  const isGated = sharedGatedIds.includes(blogPost.id);
  const { featuredImage, absoluteUrl } = blogPost;
  const ariaLabel = `${groupDefaultText.featuredImageText} ${blogPost.featuredImageAltText}`;

  return (
    <a
      href={absoluteUrl}
      data-testid="blog-post-image-link"
      aria-label={ariaLabel}
      {...addDescribedBy(isGated)}
    >
      <img
        src={featuredImage}
        alt={blogPost.featuredImageAltText}
        className={styles.hsBlogPostListingImage}
      />
    </a>
  );
};

export default A11yImageLink;
