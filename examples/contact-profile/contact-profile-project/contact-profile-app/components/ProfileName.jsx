import Row from './Row';
import Column from './Column';

import styles from '../styles/theme.module.css';

const ProfileName = ({ firstName, lastName, city, country, style = {} }) => {
  return (
    <div className={styles.rowFluidWrapper} style={{ ...style }}>
      <Row>
        <Column>
          <h3 style={{ margin: 0 }}>
            {firstName} {lastName}
          </h3>
        </Column>
      </Row>
      <Row>
        <Column>
          <small>
            {city} &#183; {country}
          </small>
        </Column>
      </Row>
    </div>
  );
};

export default ProfileName;
