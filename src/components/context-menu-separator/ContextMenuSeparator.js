import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContextMenuSeparator = ({ className }) => (
  <div className={className}></div>
);

ContextMenuSeparator.propTypes = {
  className: PropTypes.string.isRequired,
};

const StyledContextMenuSeparator = styled(props => (
  <ContextMenuSeparator {...props} />
))`
  height: 0;
  width: 100%;
  margin: 7px 0;
  border: 1px solid #c7c7c7;
`;

export default StyledContextMenuSeparator;
