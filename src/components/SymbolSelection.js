export const SymbolSelection = ({ onSymbolSelect }) => {
  return (
    <div>
      <h1 style={{}}>Tic Tac Toe </h1>
      <h2
        style={{
          marginTop: "30px",
        }}
      >
        Select Your Symbol
      </h2>
      <button class="btn" onClick={() => onSymbolSelect("X")}>
        X
      </button>
      <button class="btn" onClick={() => onSymbolSelect("O")}>
        O
      </button>
    </div>
  );
};
