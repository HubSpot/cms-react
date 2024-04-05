import { useSharedIslandState } from '@hubspot/cms-components';
import styles from '../../styles.module.css';
import { addDescribedBy } from '../../utils/utils.js';

interface BlogPost {
  id: number;
  absoluteUrl: string;
  name: string;
}

interface A11yButtonLinkProps {
  blogPost?: BlogPost;
  buttonText?: string;
  groupDefaultText?: {
    readFullPostText?: string;
  };
}

const A11yButtonLink: React.FC<A11yButtonLinkProps> = ({
  blogPost,
  buttonText,
  groupDefaultText,
}) => {
  const [sharedGatedIds] = useSharedIslandState();
  const isGated = sharedGatedIds.includes(blogPost.id);
  const { absoluteUrl } = blogPost;
  const ariaLabel = `${groupDefaultText.readFullPostText} ${blogPost.name}`;

  return (
    <div className={styles.hsBlogPostButtonWrapper}>
      <a
        data-testid="buttonLink"
        className={`${styles.hsBlogPostButton} button`}
        href={absoluteUrl}
        aria-label={ariaLabel}
        {...addDescribedBy(isGated)}
      >
        {buttonText}
      </a>
    </div>
  );
};

export default A11yButtonLink;
