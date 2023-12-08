import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from '@mui/material';

type Contact = {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  _metadata: {
    id: string;
  };
};

type ContactList = [Contact];

type ContactListProps = {
  contacts: ContactList;
  dataQueryResult: {
    data: {
      CRM: {
        contact_collection: {
          items: ContactList;
        };
      };
    };
  };
  fieldValues: {
    layout: string;
  };
};

const ContactTable = ({ contacts }: { contacts: ContactList }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((row) => (
            <TableRow
              key={row._metadata.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstname}
              </TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ContactCards = ({ contacts }: { contacts: ContactList }) => {
  return (
    <Grid container spacing={2}>
      {contacts.map((contact) => {
        return (
          <Grid key={`contact-${contact._metadata.id}`} item xs={6}>
            <Card>
              <CardContent>
                <div>
                  <h2>
                    {contact.firstname} {contact.lastname}
                  </h2>
                  <p>{contact.email}</p>
                  <p>{contact.company}</p>
                </div>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export const Component = (props: ContactListProps) => {
  const contacts = props.dataQueryResult.data.CRM.contact_collection.items;
  const layout = props.fieldValues.layout || 'Table';

  switch (layout) {
    case 'Table':
      return <ContactTable contacts={contacts} />;
    case 'Card':
      return <ContactCards contacts={contacts} />;
    default:
      return JSON.stringify(contacts);
  }
};

export const meta = {
  label: 'ContactList',
};

export { fields } from './fields.jsx';

export const query = `
query ContactQuery {
  CRM {
    contact_collection(limit: 10) {
      items {
        email
        firstname
        lastname
        company
        _metadata {
          id
        }
      }
    }
  }
}
`;
