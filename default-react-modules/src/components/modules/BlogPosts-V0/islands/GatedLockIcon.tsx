import { useSharedIslandState } from '@hubspot/cms-components';
import lockIcon from '../assets/lock_icon.svg';
import styles from '../styles.module.css';

interface GatedLockIconProps {
  contentIdToGateCheck: number;
  hasPostTitle: boolean;
}

const GatedLockIcon = ({
  contentIdToGateCheck,
  hasPostTitle,
}: GatedLockIconProps) => {
  const [sharedGatedIds] = useSharedIslandState();
  const iconClass =
    hasPostTitle === true
      ? 'gatedContentLockIcon--marginLeft'
      : 'gatedContentLockIcon';

  if (sharedGatedIds.length && sharedGatedIds.includes(contentIdToGateCheck)) {
    return (
      <img
        className={styles[iconClass]}
        data-testid="gatedIconImage"
        src={lockIcon}
        width="20"
        height="20"
        role="presentation"
        alt=""
      />
    );
  }
};

export default GatedLockIcon;
