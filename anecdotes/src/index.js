import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Heading = ({text}) => <h2>{text}</h2>;

const Button = ({onClick,text }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      {anecdote}
      <br />
      has {votes} vote(s)
    </>
  );
};

const MostVoted = ({hasVotes, anecdote, votes}) => {
  return (
    <>
      <Heading text="Anecdote with Most Votes" />
      {!hasVotes && <>No anecdotes have been voted on yet.</>}
      {hasVotes && (
        <Anecdote anecdote={anecdote} votes={votes} />
      )}
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [hasVotes, setHasVotes] = useState(false);

  const getRandomIdx = (length) => {
    return Math.floor(Math.random() * length);
  };

  const setNewRandomAnecdote = () => {
    let randomAnecdoteIdx;

    do {
      randomAnecdoteIdx = getRandomIdx(props.anecdotes.length);
    } while (randomAnecdoteIdx === selected);

    setSelected(randomAnecdoteIdx);
  };

  const incrementVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setHasVotes(true);
  };

  const handleButtonClick = (type) => {
    switch (type) {
      case "next":
        setNewRandomAnecdote();
        break;
      case "vote":
        incrementVote();
        break;
      default:
        break;
    }
  };

  const maxVote = votes.reduce(
    (acc, num, idx) => {
      if (num > acc.num) {
        acc.num = num;
        acc.idx = idx;
      }

      return acc;
    },
    { num: 0 }
  );

  const maxVotedAnecdote = anecdotes[maxVote.idx];

  return (
    <div>
      <Heading text="Anecdote of the Day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <Button onClick={() => handleButtonClick("vote")} text="vote" />
      <Button onClick={() => handleButtonClick("next")} text="next anecdote" />
      <MostVoted
        hasVotes={hasVotes}
        anecdote={maxVotedAnecdote}
        votes={maxVote.num}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
export default App
