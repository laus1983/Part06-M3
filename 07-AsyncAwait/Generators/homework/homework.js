function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let cont = 1;
  while (max ? cont <= max : true) {
    if (cont % 3 === 0 && cont % 5 === 0) yield 'FizzBuzz';
    else if (cont % 3 === 0) yield 'Fizz';
    else if (cont % 5 === 0) yield 'Buzz';
    else yield cont;
    cont++;
  }
}



module.exports = fizzBuzzGenerator;
