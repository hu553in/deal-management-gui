import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DEAL_STATUSES, DEAL_STATUS_COLORS } from '../../constants';

const DealStatus = ({ className }) => (
  <span className={className}></span>
);

DealStatus.propTypes = {
  className: PropTypes.string.isRequired
};

const StyledDealStatus = styled(DealStatus)`
  background-color: ${({ status }) => DEAL_STATUS_COLORS[status]};
  width: 13px;
  height: 13px;
  border-radius: 50%;
  display: inline-block;
`;

StyledDealStatus.propTypes = {
  color: PropTypes.oneOf(Object.values(DEAL_STATUSES)).isRequired
};

export default StyledDealStatus;
