export const Calculate = (time, initialTime) => {
  if (time < 0) time = 0;

  const scoreReducingConstant = 10.93389831;
  console.log('initialTime', initialTime);
  console.log('time', time);
  var timeScore = (initialTime * 1000 - time) * scoreReducingConstant;
  var scoreToReduce = Math.floor(timeScore);
  const maxScore = 206;
  console.log('scoreToReduce', scoreToReduce);
  const returnScore = maxScore - scoreToReduce;
  if (returnScore < 42) return 42;

  return returnScore;
};
