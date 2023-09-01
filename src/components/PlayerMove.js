export const RenderSquare = ({board,handlePlayerMove, index}) => {
  return <div className="square" onClick={() => handlePlayerMove(index)}>
    {board[index]}
  </div>
}
