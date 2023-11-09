import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Label } from './ContactForm.styled';
import { Input, BtnAddContact, ErrorMsg } from './ContactForm.styled';
import { selectContacts } from '../../../src/redux/selectors';
import { addContact } from '../../../src/redux/operations';

Notify.init({
  borderRadius: '11px',
  position: 'top-right',
  width: '400px',
  timeout: 4000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
});

const Schema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .min(3, 'Name must be 3-25 characters long')
    .max(25, 'Name must be 3-25 characters long')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Enter valid symbols'
    ),
  phone: yup
    .string()
    .required('Required')
    .min(6, 'Number must be 6-13 characters long')
    .max(13, 'Number must be 6-13 characters long')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Enter valid symbols'
    ),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        phone: '',
        name: '',
      }}
      validationSchema={Schema}
      onSubmit={(values, actions) => {
        const { name, phone } = values;
        if (
          contacts.some(
            contact => contact.name.toLowerCase() === name.toLowerCase()
          )
        ) {
          return Notify.info(`${name} is already among your contacts`);
        }

        const contact = {
          name,
          phone,
        };
        dispatch(addContact(contact));
        Notify.success(`${name} has been successfully added to your contacts`);
        actions.resetForm();
      }}
    >
      <Form>
        <Label>
          Name
          <Input type="text" name="name" placeholder="Enter name..." />
          <ErrorMsg component="div" name="name" />
        </Label>
        <Label>
          Number
          <Input type="tel" name="phone" placeholder="Enter number..." />
          <ErrorMsg component="div" name="phone" />
        </Label>
        <BtnAddContact type="submit">Add contact</BtnAddContact>
      </Form>
    </Formik>
  );
};
