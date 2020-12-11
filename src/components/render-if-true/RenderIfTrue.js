import PropTypes from 'prop-types';

const RenderIfTrue = ({ children, statement }) => (
  statement ? children : null
);

RenderIfTrue.propTypes = {
  children: PropTypes.node.isRequired,
  statement: PropTypes.bool.isRequired
};

export default RenderIfTrue;
