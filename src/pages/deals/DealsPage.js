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
  AvailableForRoles,
  Button,
  ContextMenu,
  DealStatus,
  Dropdown,
  RenderIfTrue,
  RoundedButton,
  Table,
  TextField,
} from '@src/components/index';
import { DEAL_STATUSES, FORM_STATES, USER_ROLES } from '@src/constants';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { authManagementService } from '@src/services/index';

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
  const openMenuButtonTopOffset = useMemo(() => openMenuButtonRect?.top, [
    openMenuButtonRect,
  ]);
  const openMenuButtonBottomOffset = useMemo(
    () => window.innerHeight - openMenuButtonRect?.bottom,
    [openMenuButtonRect]
  );
  const openMenuButtonRightOffset = useMemo(
    () => window.innerWidth - openMenuButtonRect?.right,
    [openMenuButtonRect]
  );
  const openTo = useMemo(
    () => (openMenuButtonBottomOffset < contextMenuHeight ? 'top' : 'bottom'),
    [contextMenuHeight, openMenuButtonBottomOffset]
  );
  useEffect(() => {
    const handleResize = () => setIsOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  const makePendingButton = useMemo(
    () => ({
      icon: MinusNormal,
      hoverIcon: MinusHover,
      activeIcon: MinusActive,
      text: 'Make pending',
      availableForRoles: [USER_ROLES.SUPERVISOR, USER_ROLES.ADMIN],
      onClick: async () => {
        setIsOpen(false);
        await deal.changeStatus(item.id, DEAL_STATUSES.PENDING);
        await getAllDeals();
      },
    }),
    [getAllDeals, item]
  );
  const approveButton = useMemo(
    () => ({
      icon: CheckMarkGreenNormal,
      hoverIcon: CheckMarkGreenHover,
      activeIcon: CheckMarkGreenActive,
      text: 'Approve',
      availableForRoles: [USER_ROLES.SUPERVISOR, USER_ROLES.ADMIN],
      onClick: async () => {
        setIsOpen(false);
        await deal.changeStatus(item.id, DEAL_STATUSES.APPROVED);
        await getAllDeals();
      },
    }),
    [getAllDeals, item]
  );
  const rejectButton = useMemo(
    () => ({
      icon: CrossOrangeNormal,
      hoverIcon: CrossOrangeHover,
      activeIcon: CrossOrangeActive,
      text: 'Reject',
      availableForRoles: [USER_ROLES.SUPERVISOR, USER_ROLES.ADMIN],
      onClick: async () => {
        setIsOpen(false);
        await deal.changeStatus(item.id, DEAL_STATUSES.REJECTED);
        await getAllDeals();
      },
    }),
    [getAllDeals, item]
  );
  const changeStatusButtons = useMemo(
    () => ({
      [DEAL_STATUSES.PENDING]: [approveButton, rejectButton],
      [DEAL_STATUSES.APPROVED]: [rejectButton, makePendingButton],
      [DEAL_STATUSES.REJECTED]: [approveButton, makePendingButton],
    }),
    [approveButton, makePendingButton, rejectButton]
  );
  const user = authManagementService.getUser();
  const separatorPositions = useMemo(
    () => [...(user.role === USER_ROLES.ADMIN ? [2] : [])],
    [user]
  );
  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const handleEditDealButtonClick = useCallback(() => {
    setIsOpen(false);
    setIdFieldValue(item.id);
    setCustomerIdFieldValue(item.customerId);
    setProviderIdFieldValue(item.providerId);
    setDescriptionFieldValue(item.description);
    setFormState(FORM_STATES.EDIT);
  }, [
    item,
    setCustomerIdFieldValue,
    setDescriptionFieldValue,
    setFormState,
    setIdFieldValue,
    setProviderIdFieldValue,
  ]);
  const handleDeleteDealButtonClick = useCallback(async () => {
    setIsOpen(false);
    await deal.deleteById(item.id);
    await getAllDeals();
  }, [getAllDeals, item]);
  const contextMenuItems = useMemo(
    () => [
      {
        icon: PencilNormal,
        hoverIcon: PencilHover,
        activeIcon: PencilActive,
        text: 'Edit',
        availableForRoles: [USER_ROLES.ADMIN],
        onClick: handleEditDealButtonClick,
      },
      {
        icon: TrashNormal,
        hoverIcon: TrashHover,
        activeIcon: TrashActive,
        text: 'Delete',
        availableForRoles: [USER_ROLES.ADMIN],
        onClick: handleDeleteDealButtonClick,
      },
      ...changeStatusButtons[item.status],
    ],
    [
      changeStatusButtons,
      handleDeleteDealButtonClick,
      handleEditDealButtonClick,
      item,
    ]
  );
  return (
    <AvailableForRoles roles={[USER_ROLES.SUPERVISOR, USER_ROLES.ADMIN]}>
      <StyledRowActionsWrapper>
        <Button
          ref={openMenuButtonRef}
          icon={DownArrowNormal}
          hoverIcon={DownArrowHover}
          activeIcon={DownArrowActive}
          onClick={openMenu}
        />
        <RenderIfTrue statement={isOpen}>
          <ContextMenu
            closeMenuCallback={closeMenu}
            separatorPositions={separatorPositions}
            openTo={openTo}
            items={contextMenuItems}
            topOffset={openMenuButtonTopOffset}
            bottomOffset={openMenuButtonBottomOffset}
            rightOffset={openMenuButtonRightOffset}
          />
        </RenderIfTrue>
      </StyledRowActionsWrapper>
    </AvailableForRoles>
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
  const getAllCustomers = useCallback(async () => {
    const response = await customer.getAll();
    setCustomers(response.data.data);
  }, []);
  const getAllProviders = useCallback(async () => {
    const response = await provider.getAll();
    setProviders(response.data.data);
  }, []);
  const getAllDeals = useCallback(async () => {
    const response = await deal.getAll();
    setDeals(response.data.data);
  }, []);
  const editDeal = useCallback(
    async (id, customerId, providerId, description) => {
      await deal.edit(id, customerId, providerId, description);
      await getAllDeals();
    },
    [getAllDeals]
  );
  const createDeal = useCallback(
    async (customerId, providerId, description) => {
      await deal.create(customerId, providerId, description);
      await getAllDeals();
    },
    [getAllDeals]
  );
  useEffect(() => {
    getAllCustomers();
    getAllProviders();
    getAllDeals();
  }, [getAllCustomers, getAllDeals, getAllProviders]);
  const onChangeDescriptionField = event => {
    event.preventDefault();
    setDescriptionFieldValue(event.target.value);
  };
  const renderDealStatus = useCallback(
    item => <DealStatus key={`${item.id}-status`} status={item.status} />,
    []
  );
  const customerIdDropdownOptions = useMemo(
    () =>
      customers.map(customer => ({
        label: customer.id,
        value: customer.id,
      })),
    [customers]
  );
  const providerIdDropdownOptions = useMemo(
    () =>
      providers.map(provider => ({
        label: provider.id,
        value: provider.id,
      })),
    [providers]
  );
  const customerIdSelectedOption = useMemo(
    () =>
      customerIdFieldValue === null
        ? null
        : {
            label: customerIdFieldValue,
            value: customerIdFieldValue,
          },
    [customerIdFieldValue]
  );
  const providerIdSelectedOption = useMemo(
    () =>
      providerIdFieldValue === null
        ? null
        : {
            label: providerIdFieldValue,
            value: providerIdFieldValue,
          },
    [providerIdFieldValue]
  );
  const onChangeCustomerIdField = useCallback(
    option => setCustomerIdFieldValue(option?.value ?? null),
    []
  );
  const onChangeProviderIdField = useCallback(
    option => setProviderIdFieldValue(option?.value ?? null),
    []
  );
  const columns = useMemo(
    () => [
      {
        name: 'status',
        render: renderDealStatus,
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
            options={customerIdDropdownOptions}
            selectedOption={customerIdSelectedOption}
            placeholder='Choose customer ID'
            onChange={onChangeCustomerIdField}
          />
        ),
      },
      {
        name: 'providerId',
        title: 'Provider ID',
        dataIndex: 'providerId',
        formField: (
          <Dropdown
            options={providerIdDropdownOptions}
            selectedOption={providerIdSelectedOption}
            placeholder='Choose provider ID'
            onChange={onChangeProviderIdField}
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
    ],
    [
      customerIdDropdownOptions,
      customerIdSelectedOption,
      descriptionFieldValue,
      onChangeCustomerIdField,
      onChangeProviderIdField,
      providerIdDropdownOptions,
      providerIdSelectedOption,
      renderDealStatus,
    ]
  );
  const isFormSubmitButtonDisabled = useMemo(
    () =>
      customerIdFieldValue == null ||
      providerIdFieldValue == null ||
      descriptionFieldValue.length === 0,
    [customerIdFieldValue, providerIdFieldValue, descriptionFieldValue]
  );
  const handleCreateDealButtonClick = useCallback(
    () =>
      createDeal(
        customerIdFieldValue,
        providerIdFieldValue,
        descriptionFieldValue
      ).then(() => {
        setCustomerIdFieldValue(null);
        setProviderIdFieldValue(null);
        setDescriptionFieldValue('');
      }),
    [
      createDeal,
      customerIdFieldValue,
      descriptionFieldValue,
      providerIdFieldValue,
    ]
  );
  const handleEditDealButtonClick = useCallback(
    () =>
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
      }),
    [
      customerIdFieldValue,
      descriptionFieldValue,
      editDeal,
      idFieldValue,
      providerIdFieldValue,
    ]
  );
  const handleCancelButtonClick = useCallback(() => {
    setIdFieldValue('');
    setCustomerIdFieldValue(null);
    setProviderIdFieldValue(null);
    setDescriptionFieldValue('');
    setFormState(FORM_STATES.CREATE);
  }, []);
  const formButtons = useCallback(
    () => (
      <StyledFormButtonsWrapper>
        <RenderIfTrue statement={formState === FORM_STATES.CREATE}>
          <RoundedButton
            icon={Plus}
            disabled={isFormSubmitButtonDisabled}
            onClick={handleCreateDealButtonClick}
          />
        </RenderIfTrue>
        <RenderIfTrue statement={formState === FORM_STATES.EDIT}>
          <RoundedButton
            icon={CheckMark}
            disabled={isFormSubmitButtonDisabled}
            onClick={handleEditDealButtonClick}
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
      handleCancelButtonClick,
      handleCreateDealButtonClick,
      handleEditDealButtonClick,
      isFormSubmitButtonDisabled,
    ]
  );
  const rowActions = useCallback(
    item => (
      <RowActions
        item={item}
        setIdFieldValue={setIdFieldValue}
        setCustomerIdFieldValue={setCustomerIdFieldValue}
        setProviderIdFieldValue={setProviderIdFieldValue}
        setDescriptionFieldValue={setDescriptionFieldValue}
        setFormState={setFormState}
        getAllDeals={getAllDeals}
      />
    ),
    [getAllDeals]
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
