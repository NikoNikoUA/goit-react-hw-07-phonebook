import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GiRotaryPhone } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from '../components/Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../../src/redux/selectors';
import { fetchContacts } from '../../src/redux/operations';

import {
  Container,
  FormContainer,
  StatisticsContainer,
  ContactsHeading,
  MainHeading,
  NoContactsText,
} from './Container.styled';

Notify.init({
  borderRadius: '11px',
  position: 'top-right',
  width: '400px',
  timeout: 4000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
});

export const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <FormContainer>
        <MainHeading>
          Phonebook <GiRotaryPhone />
        </MainHeading>
        <ContactForm />
      </FormContainer>
      <StatisticsContainer>
        <ContactsHeading>Contacts</ContactsHeading>
        <Filter />
        {isLoading && !error && <b>Request in progress...</b>}
        {contacts?.length ? (
          <ContactList />
        ) : (
          <NoContactsText>
            There are no contacts in your phoneboook
          </NoContactsText>
        )}
      </StatisticsContainer>
    </Container>
  );
};
