import PropTypes from 'prop-types';
import Select from 'react-select';

const Dropdown = ({
  selectedOption,
  placeholder,
  onChange,
  options,
  className
}) => {
  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#5fd2b5',
      primary25: '#f3fffc'
    }
  });
  return (
    <Select
      theme={customTheme}
      className={className}
      options={options}
      isClearable={true}
      isSearchable={true}
      onChange={onChange}
      placeholder={placeholder}
      value={selectedOption}
    />
  );
};

Dropdown.propTypes = {
  selectedOption: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

Dropdown.defaultProps = {
  placeholder: undefined
};

export default Dropdown;
