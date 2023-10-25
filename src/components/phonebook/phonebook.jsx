import { Component } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { Contact } from 'components/contact/contact';
// import { Contacts } from 'components/contact/contact';
import { Button, StyledForm } from './form.styled';
import { Container } from './phonebook.styled';

const ContactSchema = Yup.object().shape({
  name: Yup.string('Invalid name').required('Enter name'),
  number: Yup.number('Invalid phone').required('Enter phone'),
});

export class Phonebook extends Component {
  state = {
    // contacts: [{ id: nanoid(), name: 'Kate', number: '09828' }],
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addContact = values => {
    let newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterHandle = value => {
    const state = this.state;
    this.setState({ filter: value });
    let filteredContacts = [];

    filteredContacts = state.contacts.filter(contact => {
      return contact.name.includes(value);
    });
    return filteredContacts;
  };

  render() {
    const state = this.state;

    return (
      <Container>
        <h2>Phonebook</h2>
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={ContactSchema}
          onSubmit={(values, actions) => {
            this.addContact(values);
            actions.resetForm();
          }}
        >
          <StyledForm>
            <label>
              <p>Name</p>
              <Field type="text" name="name" required />
              <ErrorMessage name="name" component="div" />
            </label>
            <label>
              <p>Number</p>
              <Field type="tel" name="number" required />
              <ErrorMessage name="number" component="div" />
            </label>
            <Button type="submit">Add contact</Button>
          </StyledForm>
        </Formik>

        <h2>Contacts</h2>
        <input
          type="text"
          name="filter"
          onChange={evt => this.filterHandle(evt.target.value)}
        />
        {/* <Contacts onChangeFilter={this.filteredContacts}/> */}
        <ul>
          {state.contacts.map(contact => (
            <li key={contact.id}>
              <Contact name={contact.name} phone={contact.number} />
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
