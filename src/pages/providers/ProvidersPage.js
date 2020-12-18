import { provider } from '@src/api/index';
import {
  CheckMark,
  Cross,
  PencilActive,
  PencilHover,
  PencilNormal,
  Plus,
  TrashActive,
  TrashHover,
  TrashNormal,
} from '@src/assets/icons/index';
import { Button, RoundedButton, Table, TextField } from '@src/components/index';
import { EMAIL_REGEX, FORM_STATES } from '@src/constants';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledTextField = styled(props => <TextField {...props} />)`
  width: 100%;
`;

const StyledFormButtonsWrapper = styled.span`
  display: flex;
`;

const StyledRowActionsWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  visibility: hidden;

  tr:hover & {
    visibility: visible;
  }
`;

const StyledDeleteButton = styled(props => <Button {...props} />)`
  margin-left: 42px;
`;

const StyledCancelButton = styled(props => <RoundedButton {...props} />)`
  margin-left: 35px;
`;

const ProvidersPage = () => {
  const [formState, setFormState] = useState(FORM_STATES.CREATE);
  const [providers, setProviders] = useState([]);
  const [idFieldValue, setIdFieldValue] = useState('');
  const [productFieldValue, setProductFieldValue] = useState('');
  const [phoneFieldValue, setPhoneFieldValue] = useState('');
  const [emailFieldValue, setEmailFieldValue] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const checkEmailValidity = () => {
    setEmailValid(
      emailFieldValue.length === 0 || EMAIL_REGEX.test(emailFieldValue)
    );
  };
  const getAllProviders = async () => {
    const response = await provider.getAll();
    return setProviders(response.data.data);
  };
  const deleteProvider = async id => {
    await provider.deleteById(id);
    return await getAllProviders();
  };
  const editProvider = async (id, product, phone, email) => {
    await provider.edit(id, product, phone, email);
    return await getAllProviders();
  };
  const createProvider = async (product, phone, email) => {
    await provider.create(product, phone, email);
    return await getAllProviders();
  };
  useEffect(() => getAllProviders(), []);
  const onChangeProductField = event => {
    event.preventDefault();
    setProductFieldValue(event.target.value);
  };
  const onChangePhoneField = event => {
    event.preventDefault();
    setPhoneFieldValue(event.target.value);
  };
  const onChangeEmailField = event => {
    event.preventDefault();
    setEmailValid(true);
    setEmailFieldValue(event.target.value);
  };
  const columns = [
    {
      name: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      name: 'product',
      title: 'Product',
      dataIndex: 'product',
      formField: (
        <StyledTextField
          placeholder='Enter product'
          value={productFieldValue}
          onChange={onChangeProductField}
        />
      ),
    },
    {
      name: 'phone',
      title: 'Phone',
      dataIndex: 'phone',
      formField: (
        <StyledTextField
          placeholder='Enter phone'
          value={phoneFieldValue}
          onChange={onChangePhoneField}
        />
      ),
    },
    {
      name: 'email',
      title: 'Email',
      dataIndex: 'email',
      formField: (
        <StyledTextField
          placeholder='Enter email'
          value={emailFieldValue}
          onChange={onChangeEmailField}
          onFocusOut={checkEmailValidity}
          invalid={!emailValid}
        />
      ),
    },
  ];
  const rowActions = item => (
    <StyledRowActionsWrapper>
      <Button
        icon={PencilNormal}
        hoverIcon={PencilHover}
        activeIcon={PencilActive}
        onClick={() => {
          setIdFieldValue(item.id);
          setProductFieldValue(item.product);
          setPhoneFieldValue(item.phone);
          setEmailFieldValue(item.email);
          setFormState(FORM_STATES.EDIT);
        }}
      />
      <StyledDeleteButton
        icon={TrashNormal}
        hoverIcon={TrashHover}
        activeIcon={TrashActive}
        onClick={() => deleteProvider(item.id)}
      />
    </StyledRowActionsWrapper>
  );
  const formButtons = () => (
    <StyledFormButtonsWrapper>
      {formState === FORM_STATES.CREATE && (
        <RoundedButton
          icon={Plus}
          disabled={
            productFieldValue.length === 0 ||
            phoneFieldValue.length === 0 ||
            emailFieldValue.length === 0 ||
            !EMAIL_REGEX.test(emailFieldValue)
          }
          onClick={() => {
            createProvider(
              productFieldValue,
              phoneFieldValue,
              emailFieldValue
            ).then(() => {
              setProductFieldValue('');
              setPhoneFieldValue('');
              setEmailFieldValue('');
            });
          }}
        />
      )}
      {formState === FORM_STATES.EDIT && (
        <>
          <RoundedButton
            icon={CheckMark}
            disabled={
              productFieldValue.length === 0 ||
              phoneFieldValue.length === 0 ||
              emailFieldValue.length === 0 ||
              !EMAIL_REGEX.test(emailFieldValue)
            }
            onClick={() => {
              editProvider(
                idFieldValue,
                productFieldValue,
                phoneFieldValue,
                emailFieldValue
              ).then(() => {
                setIdFieldValue('');
                setProductFieldValue('');
                setPhoneFieldValue('');
                setEmailFieldValue('');
                setFormState(FORM_STATES.CREATE);
              });
            }}
          />
          <StyledCancelButton
            icon={Cross}
            color='#bababa'
            hoverColor='#838383'
            activeColor='#414141'
            onClick={() => {
              setIdFieldValue('');
              setProductFieldValue('');
              setPhoneFieldValue('');
              setEmailFieldValue('');
              setFormState(FORM_STATES.CREATE);
            }}
          />
        </>
      )}
    </StyledFormButtonsWrapper>
  );
  return (
    <Table
      columns={columns}
      data={providers}
      rowActions={rowActions}
      formButtons={formButtons}
    />
  );
};

export default ProvidersPage;
