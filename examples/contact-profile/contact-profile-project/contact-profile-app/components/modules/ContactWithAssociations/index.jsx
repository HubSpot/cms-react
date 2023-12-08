import Grid from '../../Grid.jsx';
import Row from '../../Row.jsx';
import Column from '../../Column.jsx';
import ProfileImage from '../../ProfileImage.jsx';
import ProfileName from '../../ProfileName.jsx';
import Company from '../../Company.jsx';
import Layout from '../../Layout.jsx';

/**
 * This component depends on data from a GraphQL query.
 * The GraphQL query is looking for the "contact" HubL
 * variable in order to get the email for the query
 * argument.
 *
 * NOTE: In the case of local development, the "contact"
 * HubL variable will not be present (for now) and so the query
 * will always rely on the default as written in it.
 */
export const Component = (props) => {
  const contact = props.dataQueryResult.data.CRM.contact;

  const company =
    contact.associations.company_collection__primary.items.length &&
    contact.associations.company_collection__primary.items[0];

  return (
    <Layout>
      <Grid style={{ maxWidth: '75%' }}>
        <h1>{`Contact with Associations`}</h1>

        {contact.email ? (
          <Row>
            <Column style={{ flex: 2 }}>
              <ProfileImage firstName={contact.firstname} />
            </Column>
            <Column style={{ flex: 10 }}>
              <ProfileName
                firstName={contact.firstname}
                lastName={contact.lastname}
                city={contact.city}
                country={contact.country}
              />
            </Column>
          </Row>
        ) : (
          <span>Unable to find contact</span>
        )}

        {company && (
          <Row style={{ marginTop: '1rem' }}>
            <Column width="12">
              <Company name={company.name} description={company.description} />
            </Column>
          </Row>
        )}
      </Grid>
    </Layout>
  );
};
export { fields } from './fields.jsx';

export const meta = {
  label: `Contact With Associations Module`,
};

/*
 * This query string includes a comment which creates a GraphQL variable "$email",
 * which is populated by referencing a HubL variable which is assumed to be
 * present in the render context. Here is a list of more variables from the
 * CMS Reference docs https://developers.hubspot.com/docs/cms/hubl/variables.
 *
 * There are scenarios in which these predefined variables are undefined,
 * to account for this the query sets a fallaback. In this case the fallback
 * is "bh@hubspot.com".
 */
export const query = `
# $email: "{{ contact.email }}"
query ContactQuery($email: String! = "bh@hubspot.com") {
  CRM {
    contact(uniqueIdentifier: "email", uniqueIdentifierValue: $email) {
      firstname
      lastname
      email
      country
      city
      company
      associations {
        company_collection__primary {
          items {
            name
            description
          }
        }
      }
    }
  }
}
`;
