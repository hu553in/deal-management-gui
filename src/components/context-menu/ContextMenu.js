import { UpArrow } from '@src/assets/icons/index';
import {
  Button,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@src/components/index';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const StyledButton = styled(props => <Button {...props} />)`
  position: absolute;
  right: 13px;

  ${({ openTo }) => `${openTo === 'bottom' ? 'top' : 'bottom'}: 13px;`}
`;

export const calculateHeight = (itemCount, separatorCount) =>
  46 * itemCount + 16 * separatorCount + 14;

const ContextMenu = ({
  items,
  separatorPositions,
  closeMenuCallback,
  topOffset,
  bottomOffset,
  rightOffset,
  openTo,
}) => {
  const modalStyles = {
    overlay: {
      ...ReactModal.defaultStyles.overlay,
      backgroundColor: 'transparent',
    },
    content: {
      ...ReactModal.defaultStyles.content,
      position: 'absolute',
      top: openTo === 'bottom' ? `calc(${topOffset}px - 13px)` : 'unset',
      bottom: openTo === 'top' ? `calc(${bottomOffset}px - 13px)` : 'unset',
      right: `calc(${rightOffset}px - 26px)`,
      left: 'unset',
      width: 'fit-content',
      height: 'fit-content',
      border: '2px solid #c7c7c7',
      background: '#fff',
      borderRadius: '3px',
      padding: '10px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };
  const itemElements = useMemo(() => {
    const elements = items.map(item => (
      <ContextMenuItem
        key={item.text}
        text={item.text}
        icon={item.icon}
        hoverIcon={item.hoverIcon}
        activeIcon={item.activeIcon}
        onClick={item.onClick}
      />
    ));
    separatorPositions.forEach((position, index) =>
      elements.splice(
        position,
        0,
        <ContextMenuSeparator key={`separator-${index}`} />
      )
    );
    return elements;
  }, [items, separatorPositions]);
  return (
    <ReactModal
      style={modalStyles}
      isOpen
      ariaHideApp={false}
      onRequestClose={closeMenuCallback}
    >
      <StyledButton
        openTo={openTo}
        icon={UpArrow}
        onClick={closeMenuCallback}
      />
      {itemElements}
    </ReactModal>
  );
};

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeMenuCallback: PropTypes.func.isRequired,
  separatorPositions: PropTypes.arrayOf(PropTypes.number),
  topOffset: PropTypes.number,
  bottomOffset: PropTypes.number,
  rightOffset: PropTypes.number,
  openTo: PropTypes.oneOf(['top', 'bottom']),
};

ContextMenu.defaultProps = {
  separatorPositions: [],
  topOffset: undefined,
  bottomOffset: undefined,
  rightOffset: undefined,
  openTo: 'bottom',
};

export default ContextMenu;
