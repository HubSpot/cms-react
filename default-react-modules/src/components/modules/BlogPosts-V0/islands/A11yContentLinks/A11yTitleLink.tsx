import { useSharedIslandState } from '@hubspot/cms-components';
import lockIcon from '../../assets/lock_icon.svg';
import { addDescribedBy } from '../../utils/utils.js';
import styles from '../../styles.module.css';

interface BlogPost {
  id: number;
  absoluteUrl: string;
  name: string;
}

interface A11yTitleLinkProps {
  blogPost: BlogPost;
  titleStyle: {
    headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };
}

const A11yTitleLink: React.FC<A11yTitleLinkProps> = ({
  blogPost,
  titleStyle,
}) => {
  const [sharedGatedIds] = useSharedIslandState();
  const isGated = sharedGatedIds.includes(blogPost.id);
  const { absoluteUrl, name } = blogPost;
  const TitleHeading = titleStyle.headingLevel;

  return (
    <TitleHeading className={styles.hsBlogPostTitle}>
      <a
        data-testid="titleLink"
        className={styles.hsBlogPostTitleLink}
        href={absoluteUrl}
        {...addDescribedBy(isGated)}
      >
        {name}
      </a>
      {isGated && (
        <img
          className={styles['gatedContentLockIcon--marginLeft']}
          data-testid="gatedIconImage"
          src={lockIcon}
          width="20"
          height="20"
          role="presentation"
          alt=""
        />
      )}
    </TitleHeading>
  );
};

export default A11yTitleLink;
