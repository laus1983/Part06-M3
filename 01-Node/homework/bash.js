const commands = require('./commands');

const done = function(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(" "); // remueve la nueva línea
  var cmd = args.shift();
  if(commands[cmd]) {
    commands[cmd](done, args);
    } else {
        done("Command not found");
    }
});


//------------------------------ Se puede hacer con un switch o con sentencias if else.
//   if(cmd === 'date') {
//     // process.stdout.write(Date());  
//     commands[cmd](done);
//   }
//   if(cmd === 'pwd') {
//     // process.stdout.write(process.cwd());
//     commands[cmd](done);
//   }
//     if(cmd === 'ls') {
//         commands[cmd](done);
//     }
//   process.stdout.write('\nprompt > ');
// });
