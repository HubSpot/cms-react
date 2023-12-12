import Row from './Row';
import Column from './Column';

const ProfileName = ({ name, description }) => {
  return (
    <div className="row-fluid-wrapper">
      <Row>
        <h2>Primary Company: </h2>
      </Row>
      <Row>
        <Column width="12">
          <h3 style={{ margin: 0 }}>{name}</h3>
        </Column>
      </Row>
      <Row>
        <Column width="12">
          <small>{description}</small>
        </Column>
      </Row>
    </div>
  );
};

export default ProfileName;
