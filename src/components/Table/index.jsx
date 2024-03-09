import PropTypes from "prop-types";

const Table = ({ header, rows }) => {
  const getTd = (key, row) => {
    let tableheader = header.find((header) => header.accessor === key);

    if (typeof tableheader.render == "function") {
      return tableheader.render(row);
    }
    return row[key];
  };

  const prepareRow = (row) => {
    let newRow = {};
    header.forEach((head) => {
      let rowKeys = Object.keys(row);
      if (rowKeys.includes(head.accessor)) {
        newRow[head.accessor] = row[head.accessor];
      } else if (head.render) {
        newRow[head.accessor] = row.render;
      }
    });
    return newRow;
  };
  return (
    <table className="table bordered">
      <thead>
        <tr>
          {header.map((header, key) => (
            <th key={key}>{header.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows?.length > 0 &&
          rows.map((rowData, rowIndex) => {
            let row = prepareRow(rowData);
            return (
              <tr key={rowIndex}>
                {Object.keys(row).map((key, index) => {
                  return (
                    <td key={index}>
                      {getTd(key, {
                        ...row,
                        ...rows[rowIndex],
                        index: rowIndex,
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  header: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
