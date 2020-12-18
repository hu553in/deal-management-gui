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
import {
  AvailableForRoles,
  Button,
  RenderIfTrue,
  RoundedButton,
  Table,
  TextField,
} from '@src/components/index';
import { FORM_STATES, USER_ROLES } from '@src/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const getAllCustomers = useCallback(async () => {
    const response = await customer.getAll();
    setCustomers(response.data.data);
  }, []);
  const deleteCustomer = useCallback(
    async id => {
      await customer.deleteById(id);
      await getAllCustomers();
    },
    [getAllCustomers]
  );
  const editCustomer = useCallback(
    async (id, product, phone) => {
      await customer.edit(id, product, phone);
      await getAllCustomers();
    },
    [getAllCustomers]
  );
  const createCustomer = useCallback(
    async (product, phone) => {
      await customer.create(product, phone);
      await getAllCustomers();
    },
    [getAllCustomers]
  );
  useEffect(() => getAllCustomers(), [getAllCustomers]);
  const onChangeProductField = event => {
    event.preventDefault();
    setProductFieldValue(event.target.value);
  };
  const onChangePhoneField = event => {
    event.preventDefault();
    setPhoneFieldValue(event.target.value);
  };
  const columns = useMemo(
    () => [
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
    ],
    [phoneFieldValue, productFieldValue]
  );
  const rowActions = useCallback(
    item => (
      <AvailableForRoles roles={[USER_ROLES.ADMIN]}>
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
      </AvailableForRoles>
    ),
    [deleteCustomer]
  );
  const isFormSubmitButtonDisabled = useMemo(
    () => productFieldValue.length === 0 || phoneFieldValue.length === 0,
    [productFieldValue, phoneFieldValue]
  );
  const handleCreateCustomerButtonClick = useCallback(
    () =>
      createCustomer(productFieldValue, phoneFieldValue).then(() => {
        setProductFieldValue('');
        setPhoneFieldValue('');
      }),
    [createCustomer, productFieldValue, phoneFieldValue]
  );
  const handleEditCustomerButtonClick = useCallback(
    () =>
      editCustomer(idFieldValue, productFieldValue, phoneFieldValue).then(
        () => {
          setIdFieldValue('');
          setProductFieldValue('');
          setPhoneFieldValue('');
          setFormState(FORM_STATES.CREATE);
        }
      ),
    [editCustomer, idFieldValue, productFieldValue, phoneFieldValue]
  );
  const handleCancelButtonClick = useCallback(() => {
    setIdFieldValue('');
    setProductFieldValue('');
    setPhoneFieldValue('');
    setFormState(FORM_STATES.CREATE);
  }, []);
  const formButtons = useCallback(
    () => (
      <StyledFormButtonsWrapper>
        <RenderIfTrue statement={formState === FORM_STATES.CREATE}>
          <RoundedButton
            icon={Plus}
            disabled={isFormSubmitButtonDisabled}
            onClick={handleCreateCustomerButtonClick}
          />
        </RenderIfTrue>
        <RenderIfTrue statement={formState === FORM_STATES.EDIT}>
          <RoundedButton
            icon={CheckMark}
            disabled={isFormSubmitButtonDisabled}
            onClick={handleEditCustomerButtonClick}
          />
          <StyledCancelButton
            icon={Cross}
            color='#bababa'
            hoverColor='#838383'
            activeColor='#414141'
            onClick={handleCancelButtonClick}
          />
        </RenderIfTrue>
      </StyledFormButtonsWrapper>
    ),
    [
      formState,
      handleCreateCustomerButtonClick,
      handleEditCustomerButtonClick,
      handleCancelButtonClick,
      isFormSubmitButtonDisabled,
    ]
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
