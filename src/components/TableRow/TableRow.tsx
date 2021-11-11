import React from 'react';

interface Props {
  fullName: string,
  score: number,
}

export const TableRow: React.FC<Props> = ({ fullName, score }) => {
  return (
    <>
      <td>{fullName}</td>
      <td>{score}</td>
    </>
  )
};