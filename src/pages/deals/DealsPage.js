import { CheckMark, Cross, Plus } from '@src/assets/icons/index';
import {
  DealStatus,
  Dropdown,
  RoundedButton,
  Table,
  TextField,
} from '@src/components/index';
import { API_ENDPOINTS, FORM_STATES } from '@src/constants';
import axios from 'axios';
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

const StyledCancelButton = styled(props => <RoundedButton {...props} />)`
  margin-left: 35px;
`;

const DealsPage = () => {
  const [, setError] = useState(undefined);
  const [formState, setFormState] = useState(FORM_STATES.CREATE);
  const [customers, setCustomers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [deals, setDeals] = useState([]);
  const [idFieldValue, setIdFieldValue] = useState('');
  const [customerIdFieldValue, setCustomerIdFieldValue] = useState(null);
  const [providerIdFieldValue, setProviderIdFieldValue] = useState(null);
  const [descriptionFieldValue, setDescriptionFieldValue] = useState('');
  const getAllCustomers = async () => {
    setError(undefined);
    try {
      const response = await axios.get(API_ENDPOINTS.CUSTOMER);
      return setCustomers(response.data.data);
    } catch (e) {
      setError('Unable to get customers. Please try again later.');
      throw e;
    }
  };
  const getAllProviders = async () => {
    setError(undefined);
    try {
      const response = await axios.get(API_ENDPOINTS.PROVIDER);
      return setProviders(response.data.data);
    } catch (e) {
      setError('Unable to get providers. Please try again later.');
      throw e;
    }
  };
  const getAllDeals = async () => {
    setError(undefined);
    try {
      const response = await axios.get(API_ENDPOINTS.DEAL);
      return setDeals(response.data.data);
    } catch (e) {
      setError('Unable to get deals. Please try again later.');
      throw e;
    }
  };
  // eslint-disable-next-line no-unused-vars
  const deleteDeal = async id => {
    setError(undefined);
    try {
      await axios.delete(`${API_ENDPOINTS.DEAL}/${id}`);
      return await getAllDeals();
    } catch (e) {
      setError(
        'Unable to delete deal. Please check ' +
          'the entered data or try again later.'
      );
      throw e;
    }
  };
  const editDeal = async (id, customerId, providerId, description) => {
    setError(undefined);
    try {
      await axios.patch(`${API_ENDPOINTS.DEAL}/${id}`, {
        customerId,
        providerId,
        description,
      });
      return await getAllDeals();
    } catch (e) {
      setError(
        'Unable to edit deal. Please check ' +
          'the entered data or try again later.'
      );
      throw e;
    }
  };
  const createDeal = async (customerId, providerId, description) => {
    setError(undefined);
    try {
      await axios.post(API_ENDPOINTS.DEAL, {
        customerId,
        providerId,
        description,
      });
      return await getAllDeals();
    } catch (e) {
      setError(
        'Unable to create deal. Please check ' +
          'the entered data or try again later.'
      );
      throw e;
    }
  };
  useEffect(() => {
    getAllCustomers();
    getAllProviders();
    getAllDeals();
  }, []);
  const onChangeDescriptionField = event => {
    event.preventDefault();
    setDescriptionFieldValue(event.target.value);
  };
  const columns = [
    {
      name: 'status',
      render: item => (
        <DealStatus key={`${item.id}-status`} status={item.status} />
      ),
    },
    {
      name: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      name: 'customerId',
      title: 'Customer ID',
      dataIndex: 'customerId',
      formField: (
        <Dropdown
          options={customers.map(customer => ({
            label: customer.id,
            value: customer.id,
          }))}
          selectedOption={
            customerIdFieldValue === null
              ? undefined
              : {
                  label: customerIdFieldValue,
                  value: customerIdFieldValue,
                }
          }
          placeholder='Choose customer ID'
          onChange={option => setCustomerIdFieldValue(option?.value ?? null)}
        />
      ),
    },
    {
      name: 'providerId',
      title: 'Provider ID',
      dataIndex: 'providerId',
      formField: (
        <Dropdown
          options={providers.map(provider => ({
            label: provider.id,
            value: provider.id,
          }))}
          selectedOption={
            providerIdFieldValue === null
              ? undefined
              : {
                  label: providerIdFieldValue,
                  value: providerIdFieldValue,
                }
          }
          placeholder='Choose provider ID'
          onChange={option => setProviderIdFieldValue(option?.value ?? null)}
        />
      ),
    },
    {
      name: 'description',
      title: 'Description',
      dataIndex: 'description',
      formField: (
        <StyledTextField
          placeholder='Enter description'
          value={descriptionFieldValue}
          onChange={onChangeDescriptionField}
        />
      ),
    },
  ];
  const rowActions = item => (
    <StyledRowActionsWrapper></StyledRowActionsWrapper>
  );
  const formButtons = () => (
    <StyledFormButtonsWrapper>
      {formState === FORM_STATES.CREATE && (
        <RoundedButton
          icon={Plus}
          disabled={
            customerIdFieldValue == null ||
            providerIdFieldValue == null ||
            descriptionFieldValue.length === 0
          }
          onClick={() => {
            createDeal(
              customerIdFieldValue,
              providerIdFieldValue,
              descriptionFieldValue
            ).then(() => {
              setCustomerIdFieldValue(null);
              setProviderIdFieldValue(null);
              setDescriptionFieldValue('');
            });
          }}
        />
      )}
      {formState === FORM_STATES.EDIT && (
        <>
          <RoundedButton
            icon={CheckMark}
            disabled={
              customerIdFieldValue == null ||
              providerIdFieldValue == null ||
              descriptionFieldValue.length === 0
            }
            onClick={() => {
              editDeal(
                idFieldValue,
                customerIdFieldValue,
                providerIdFieldValue,
                descriptionFieldValue
              ).then(() => {
                setIdFieldValue('');
                setCustomerIdFieldValue(null);
                setProviderIdFieldValue(null);
                setDescriptionFieldValue('');
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
              setCustomerIdFieldValue(null);
              setProviderIdFieldValue(null);
              setDescriptionFieldValue('');
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
      data={deals}
      rowActions={rowActions}
      formButtons={formButtons}
    />
  );
};

export default DealsPage;
