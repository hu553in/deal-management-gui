import { customer, deal, provider } from '@src/api/index';
import {
  CheckMark,
  CheckMarkGreenActive,
  CheckMarkGreenHover,
  CheckMarkGreenNormal,
  Cross,
  CrossOrangeActive,
  CrossOrangeHover,
  CrossOrangeNormal,
  DownArrowActive,
  DownArrowHover,
  DownArrowNormal,
  MinusActive,
  MinusHover,
  MinusNormal,
  PencilActive,
  PencilHover,
  PencilNormal,
  Plus,
  TrashActive,
  TrashHover,
  TrashNormal,
} from '@src/assets/icons/index';
import { calculateHeight } from '@src/components/context-menu/ContextMenu';
import {
  Button,
  ContextMenu,
  DealStatus,
  Dropdown,
  RenderIfTrue,
  RoundedButton,
  Table,
  TextField,
} from '@src/components/index';
import { DEAL_STATUSES, FORM_STATES } from '@src/constants';
import { useEffect, useRef, useState } from 'react';
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

const RowActions = ({
  item,
  setIdFieldValue,
  setCustomerIdFieldValue,
  setProviderIdFieldValue,
  setDescriptionFieldValue,
  setFormState,
  getAllDeals,
}) => {
  const contextMenuHeight = calculateHeight(4, 2);
  const openMenuButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const openMenuButtonRect = openMenuButtonRef?.current?.getBoundingClientRect();
  const openMenuButtonTopOffset = openMenuButtonRect?.top;
  const openMenuButtonBottomOffset =
    window.innerHeight - openMenuButtonRect?.bottom;
  const openMenuButtonRightOffset =
    window.innerWidth - openMenuButtonRect?.right;
  const openTo =
    openMenuButtonBottomOffset < contextMenuHeight ? 'top' : 'bottom';
  useEffect(() => {
    const handleResize = () => setIsOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  const makePendingButton = {
    icon: MinusNormal,
    hoverIcon: MinusHover,
    activeIcon: MinusActive,
    text: 'Make pending',
    onClick: async () => {
      setIsOpen(false);
      await deal.changeStatus(item.id, DEAL_STATUSES.PENDING);
      return await getAllDeals();
    },
  };
  const approveButton = {
    icon: CheckMarkGreenNormal,
    hoverIcon: CheckMarkGreenHover,
    activeIcon: CheckMarkGreenActive,
    text: 'Approve',
    onClick: async () => {
      setIsOpen(false);
      await deal.changeStatus(item.id, DEAL_STATUSES.APPROVED);
      return await getAllDeals();
    },
  };
  const rejectButton = {
    icon: CrossOrangeNormal,
    hoverIcon: CrossOrangeHover,
    activeIcon: CrossOrangeActive,
    text: 'Reject',
    onClick: async () => {
      setIsOpen(false);
      await deal.changeStatus(item.id, DEAL_STATUSES.REJECTED);
      return await getAllDeals();
    },
  };
  const changeStatusButtons = {
    [DEAL_STATUSES.PENDING]: [approveButton, rejectButton],
    [DEAL_STATUSES.APPROVED]: [rejectButton, makePendingButton],
    [DEAL_STATUSES.REJECTED]: [approveButton, makePendingButton],
  };
  return (
    <StyledRowActionsWrapper>
      <Button
        ref={openMenuButtonRef}
        icon={DownArrowNormal}
        hoverIcon={DownArrowHover}
        activeIcon={DownArrowActive}
        onClick={() => setIsOpen(true)}
      />
      <RenderIfTrue statement={isOpen}>
        <ContextMenu
          closeMenuCallback={() => setIsOpen(false)}
          separatorPositions={[2]}
          openTo={openTo}
          items={[
            {
              icon: PencilNormal,
              hoverIcon: PencilHover,
              activeIcon: PencilActive,
              text: 'Edit',
              onClick: () => {
                setIsOpen(false);
                setIdFieldValue(item.id);
                setCustomerIdFieldValue(item.customerId);
                setProviderIdFieldValue(item.providerId);
                setDescriptionFieldValue(item.description);
                setFormState(FORM_STATES.EDIT);
              },
            },
            {
              icon: TrashNormal,
              hoverIcon: TrashHover,
              activeIcon: TrashActive,
              text: 'Delete',
              onClick: async () => {
                setIsOpen(false);
                await deal.deleteById(item.id);
                return await getAllDeals();
              },
            },
            ...changeStatusButtons[item.status],
          ]}
          topOffset={openMenuButtonTopOffset}
          bottomOffset={openMenuButtonBottomOffset}
          rightOffset={openMenuButtonRightOffset}
        />
      </RenderIfTrue>
    </StyledRowActionsWrapper>
  );
};

const DealsPage = () => {
  const [formState, setFormState] = useState(FORM_STATES.CREATE);
  const [customers, setCustomers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [deals, setDeals] = useState([]);
  const [idFieldValue, setIdFieldValue] = useState('');
  const [customerIdFieldValue, setCustomerIdFieldValue] = useState(null);
  const [providerIdFieldValue, setProviderIdFieldValue] = useState(null);
  const [descriptionFieldValue, setDescriptionFieldValue] = useState('');
  const getAllCustomers = async () => {
    const response = await customer.getAll();
    return setCustomers(response.data.data);
  };
  const getAllProviders = async () => {
    const response = await provider.getAll();
    return setProviders(response.data.data);
  };
  const getAllDeals = async () => {
    const response = await deal.getAll();
    return setDeals(response.data.data);
  };
  const editDeal = async (id, customerId, providerId, description) => {
    await deal.edit(id, customerId, providerId, description);
    return await getAllDeals();
  };
  const createDeal = async (customerId, providerId, description) => {
    await deal.create(customerId, providerId, description);
    return await getAllDeals();
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
              ? null
              : { label: customerIdFieldValue, value: customerIdFieldValue }
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
              ? null
              : { label: providerIdFieldValue, value: providerIdFieldValue }
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
            getAllDeals();
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
      rowActions={item => (
        <RowActions
          item={item}
          setIdFieldValue={setIdFieldValue}
          setCustomerIdFieldValue={setCustomerIdFieldValue}
          setProviderIdFieldValue={setProviderIdFieldValue}
          setDescriptionFieldValue={setDescriptionFieldValue}
          setFormState={setFormState}
          getAllDeals={getAllDeals}
        />
      )}
      formButtons={formButtons}
    />
  );
};

export default DealsPage;
