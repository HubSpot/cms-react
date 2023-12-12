import Grid from '../../Grid.jsx';
import Row from '../../Row.jsx';
import Column from '../../Column.jsx';
import FormInput from '../../FormInput.jsx';
import ProfileImage from '../../ProfileImage.jsx';
import ProfileName from '../../ProfileName.jsx';
import Layout from '../../Layout.jsx';

/**
 * This component depends on data from a being passed from HubL.
 *
 * NOTE: In the case of local development (for now), the "contact"
 * HubL variable will not be present and so the component
 * will need to use the defaults as written bellow.
 */
export const Component = ({ hublParameters = {} }) => {
  const {
    title,
    firstName = 'Test',
    lastName = 'Subject',
    email = 'test.subject@notreal.com',
    city = 'Boston',
    country = 'USA',
  } = hublParameters;

  return (
    <Layout>
      <Grid style={{ width: '100%', maxWidth: '75%', margin: '0 auto' }}>
        {title && <h1>{title}</h1>}

        <form>
          <Row>
            <Column style={{ flex: 2 }}>
              <ProfileImage firstName={firstName} />
            </Column>
            <Column style={{ flex: 10 }}>
              <ProfileName
                firstName={firstName}
                lastName={lastName}
                city={city}
                country={country}
              />
            </Column>
          </Row>
          <hr />
          <Row>
            <Column>
              <FormInput
                id="first_name"
                label="First Name"
                defaultValue={firstName}
              />
            </Column>
            <Column>
              <FormInput
                id="last_name"
                label="Last Name"
                defaultValue={lastName}
              />
            </Column>
          </Row>
          <hr />
          <Row>
            <Column>
              <FormInput id="email" label="Email" defaultValue={email} />
            </Column>
            <Column>
              <FormInput
                id="password"
                label="Password"
                type="password"
                defaultValue={'not-real-show-dots'}
              />
            </Column>
          </Row>
          <hr />
          <div
            className="row-fluid"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
            }}
          >
            <Column width="9">
              <h4>Delete Account</h4>
              <p>
                <small>
                  By deleting your account you will lose all your data
                </small>
              </p>
            </Column>
            <Column
              width="3"
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                fontSize: '0.75rem',
              }}
            >
              <a href="#">Delete Account</a>
            </Column>
          </div>
        </form>
      </Grid>
    </Layout>
  );
};
export { fields } from './fields.jsx';
export const meta = {
  label: `Contact Profile Module`,
};
