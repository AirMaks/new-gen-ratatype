const CompletedWords = (props: any) => {
  return (
    <div className="left">
      {[...props.wordCompletedArr]?.map((w: any, i: number) => (
        <span key={i} className="completed">
          {w}
        </span>
      ))}
    </div>
  );
};

export default CompletedWords;
