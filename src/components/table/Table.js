import { AvailableForRoles } from '@src/components/index';
import { USER_ROLES } from '@src/constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTableWrapper = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    table-layout: auto;

    th {
      text-align: left;
      color: #006c51;
      font-size: 26px;
      font-weight: bold;
    }

    tr {
      height: 76px;
    }

    tbody tr {
      font-size: 22px;

      &:hover {
        background-color: #f3fffc;
      }
    }

    td {
      border-bottom: 1px solid #5fd2b5;
    }

    th,
    td {
      padding: 25px 35px;
    }
  }
`;

const getCellValue = (column, item) => {
  if (column.dataIndex) {
    return item[column.dataIndex];
  }
  if (column.render) {
    return column.render(item);
  }
  return null;
};

const EnhancedTable = ({
  columns,
  data,
  formButtons,
  rowActions,
  dataIndexForKeyGeneration,
}) => (
  <StyledTableWrapper>
    <table>
      <thead>
        <tr key='main-header-row'>
          {columns.map(column => (
            <th key={column.name}>{column.title}</th>
          ))}
        </tr>
        <AvailableForRoles
          roles={[USER_ROLES.EDITOR, USER_ROLES.SUPERVISOR, USER_ROLES.ADMIN]}
        >
          <tr key='form-header-row'>
            {[
              ...columns.map(column => (
                <th key={`${column.name}-form-field`}>
                  {column.formField ? column.formField : null}
                </th>
              )),
              <th key='form-buttons'>{formButtons()}</th>,
            ]}
          </tr>
        </AvailableForRoles>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={`${item[dataIndexForKeyGeneration]}-row`}>
            {[
              ...columns.map(column => (
                <td key={`${item[dataIndexForKeyGeneration]}-${column.name}`}>
                  {getCellValue(column, item)}
                </td>
              )),
              <td key={`${item[dataIndexForKeyGeneration]}-row-actions`}>
                <AvailableForRoles roles={[USER_ROLES.ADMIN]}>
                  {rowActions(item)}
                </AvailableForRoles>
              </td>,
            ]}
          </tr>
        ))}
      </tbody>
    </table>
  </StyledTableWrapper>
);

EnhancedTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  formButtons: PropTypes.func.isRequired,
  rowActions: PropTypes.func.isRequired,
  dataIndexForKeyGeneration: PropTypes.string,
};

EnhancedTable.defaultProps = {
  dataIndexForKeyGeneration: 'id',
};

export default EnhancedTable;
