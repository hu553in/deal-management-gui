import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import {
  Button,
  ContextMenuItem,
  ContextMenuSeparator
} from '../../atoms/index';
import closeMenu from './images/close-menu.svg';

const StyledButton = styled(Button)`
  position: absolute;
  right: 13px;
  top: 13px;
`;

const ContextMenu = ({
  items,
  separatorPositions,
  closeMenuCallback,
  topOffset,
  leftOffset
}) => {
  const modalStyles = {
    overlay: {
      ...ReactModal.defaultStyles.overlay,
      backgroundColor: '#fff'
    },
    content: {
      ...ReactModal.defaultStyles.content,
      position: 'relative',
      top: `${topOffset}px`,
      left: `${leftOffset}px`,
      width: 'fit-content',
      height: 'fit-content',
      border: '2px solid #c7c7c7',
      background: '#fff',
      borderRadius: '3px',
      padding: '10px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  };
  const itemElements = items.map((item) => (
    <ContextMenuItem
      text={item.text}
      icon={item.icon}
      onClick={item.onClick}
    />
  ));
  separatorPositions.forEach((position) => (
    itemElements.splice(position, 0, <ContextMenuSeparator />)
  ));
  return (
    <ReactModal
      style={modalStyles}
      isOpen={true}
      onRequestClose={closeMenuCallback}
    >
      <StyledButton
        icon={closeMenu}
        onClick={closeMenuCallback}
      />
      {itemElements}
    </ReactModal>
  );
};

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })).isRequired,
  closeMenuCallback: PropTypes.func.isRequired,
  topOffset: PropTypes.number.isRequired,
  leftOffset: PropTypes.number.isRequired,
  separatorPositions: PropTypes.arrayOf(PropTypes.number)
};

ContextMenu.defaultProps = {
  separatorPositions: []
};

export default ContextMenu;
