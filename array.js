module.exports = {
  randomArrayReduce: function() {
    const array = Array.from(Array(500000).keys());
    const arrayMultiplied = array.map(value => value * Math.random());
    return arrayMultiplied.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
  }
};
