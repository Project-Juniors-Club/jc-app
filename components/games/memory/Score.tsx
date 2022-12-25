type PlayerInfoProps = {
  turns: number;
  score: number;
};

const Score = ({ turns, score }: PlayerInfoProps) => {
  return (
    <div>
      <p>{`Turns: ${turns}`}</p>
      <p>
        {`Pairs found: `} {`${score}`}
      </p>
    </div>
  );
};

export default Score;
