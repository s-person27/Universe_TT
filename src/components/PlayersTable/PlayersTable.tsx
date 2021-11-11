import React from 'react';
import classNames from 'classnames';

import { TableRow } from '../TableRow/TableRow';
import { Player } from '../../types/Player';

import './PlayersTable.css';

interface Props {
  sortedPlayers: Player[],
  ascendingSort: boolean,
  handleSortOrder: () => void,
}

export const PlayersTable: React.FC<Props> = ({
  sortedPlayers,
  ascendingSort,
  handleSortOrder
}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Player Name</th>
          <th scope="col">
            <label htmlFor="sort-btn">
              Score
              <button
                type="button"
                id="sort-btn"
                className={classNames(
                {'arrow-down': !ascendingSort}
                )}
                onClick={() => handleSortOrder()}
              ></button>
            </label>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedPlayers.map(player => {
          const {id, fullName, score} = player;

          return (
            <tr key={id}>
              <TableRow
                fullName={fullName}
                score={score}
              />
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr className="table__footer">
          <td colSpan={2}>
            {`Count: ${sortedPlayers.length}`}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

