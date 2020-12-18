import { customer } from '@src/api/index';
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
import { FORM_STATES } from '@src/constants';
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

const CustomersPage = () => {
  const [formState, setFormState] = useState(FORM_STATES.CREATE);
  const [customers, setCustomers] = useState([]);
  const [idFieldValue, setIdFieldValue] = useState('');
  const [productFieldValue, setProductFieldValue] = useState('');
  const [phoneFieldValue, setPhoneFieldValue] = useState('');
  const getAllCustomers = async () => {
    const response = await customer.getAll();
    return setCustomers(response.data.data);
  };
  const deleteCustomer = async id => {
    await customer.deleteById(id);
    return await getAllCustomers();
  };
  const editCustomer = async (id, product, phone) => {
    await customer.edit(id, product, phone);
    return await getAllCustomers();
  };
  const createCustomer = async (product, phone) => {
    await customer.create(product, phone);
    return await getAllCustomers();
  };
  useEffect(() => getAllCustomers(), []);
  const onChangeProductField = event => {
    event.preventDefault();
    setProductFieldValue(event.target.value);
  };
  const onChangePhoneField = event => {
    event.preventDefault();
    setPhoneFieldValue(event.target.value);
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
          setFormState(FORM_STATES.EDIT);
        }}
      />
      <StyledDeleteButton
        icon={TrashNormal}
        hoverIcon={TrashHover}
        activeIcon={TrashActive}
        onClick={() => deleteCustomer(item.id)}
      />
    </StyledRowActionsWrapper>
  );
  const formButtons = () => (
    <StyledFormButtonsWrapper>
      {formState === FORM_STATES.CREATE && (
        <RoundedButton
          icon={Plus}
          disabled={
            productFieldValue.length === 0 || phoneFieldValue.length === 0
          }
          onClick={() => {
            createCustomer(productFieldValue, phoneFieldValue).then(() => {
              setProductFieldValue('');
              setPhoneFieldValue('');
            });
          }}
        />
      )}
      {formState === FORM_STATES.EDIT && (
        <>
          <RoundedButton
            icon={CheckMark}
            disabled={
              productFieldValue.length === 0 || phoneFieldValue.length === 0
            }
            onClick={() => {
              editCustomer(
                idFieldValue,
                productFieldValue,
                phoneFieldValue
              ).then(() => {
                setIdFieldValue('');
                setProductFieldValue('');
                setPhoneFieldValue('');
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
      data={customers}
      rowActions={rowActions}
      formButtons={formButtons}
    />
  );
};

export default CustomersPage;
