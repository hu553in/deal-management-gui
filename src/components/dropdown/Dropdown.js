import PropTypes from 'prop-types';
import Select from 'react-select';

const Dropdown = ({ selectedOption, placeholder, onChange, options }) => {
  const customTheme = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#5fd2b5',
      primary25: '#f3fffc',
    },
  });
  const customStyles = {
    container: provided => ({
      ...provided,
      fontSize: '18px',
      fontWeight: 'normal',
      height: '41px',
      color: '#414141',
    }),
    control: provided => ({
      ...provided,
      height: '41px',
      borderRadius: '3px',
      border: '1px solid #838383',
    }),
    indicatorSeparator: provided => ({
      ...provided,
      backgroundColor: '#838383',
    }),
    option: provided => ({
      ...provided,
      color: '#414141',
    }),
    indicatorsContainer: provided => ({
      ...provided,
      '& svg': {
        fill: '#838383',
      },
      '&:hover svg': {
        fill: '#414141',
      },
      '&:active svg': {
        fill: '#202020',
      },
    }),
    placeholder: provided => ({
      ...provided,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: 'calc(100% - 16px)',
    }),
  };
  return (
    <Select
      styles={customStyles}
      theme={customTheme}
      options={options}
      isClearable
      isSearchable={false}
      onChange={onChange}
      placeholder={placeholder}
      value={selectedOption}
    />
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.object,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  selectedOption: undefined,
  className: undefined,
  placeholder: undefined,
};

export default Dropdown;
