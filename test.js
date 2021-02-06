function randomDate(start, end) {
  return parseInt(
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).getTime() / 1000
  ).toFixed(0);
}

console.log(randomDate(new Date(2012, 0, 1), new Date()));
