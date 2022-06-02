var fs = require("fs");
var request = require("request");

function sort(done, args) {
  fs.readFile(args[0], "utf-8", (err, data) => {
    if (err) throw err;
    const lines = data
      .split("\n")
      .sort((a, b) => a.localeCompare(b))
      .join("\n");
    done(lines);
  });
}

function uniq(done, args) {
  fs.readFile(args[0], 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var array = data.split("\n");
    var result = array.filter(function(item, pos) {
      return array.indexOf(item) === pos;
    });
    done(result.join("\n"));
  });
}

function wc(done, args) {
  fs.readFile(args[0], "utf-8", (err, data) => {
    if (err) throw err;
    let lines = [];
    let words = [];
    let chars = [];
    data.split("\n").forEach(line => {
      lines.push(line);
      words.push(line.split(" "));
      chars.push(line.split("").length);
    });
    done(
      `${lines.length} ${words.length} ${chars.reduce((a, b) => a + b)}`
    );
  });
}

function clear(done, args) {
  done("\033c");
}

function curl(done, args) {
  request(args[0], function (error, response, body) {
    if (error) throw error;
    done(body);
  });
}

function tail(done, args) {
  fs.readFile(args[0], "utf-8", (err, data) => {
    if (err) throw err;
    const lines = data
      .split("\n")
      .splice((args[1] ? parseInt(args[1]) : 10) * -1)
      .join("\n");
    done(lines);
  });
}

function head(done, args) {
  fs.readFile(args[0], "utf-8", (err, data) => {
    if (err) throw err;
    const lines = data
      .split("\n")
      .splice(0, args[1] ? parseInt(args[1]) : 10)
      .join("\n");
    done(lines);
  });
}

function cat(done, args) {
  fs.readFile(args[0], "utf-8", (err, data) => {
    if (err) throw err;
    done(data);
  });
}

function echo(done, args) {
  done(args.join(" "));
}

function ls(done, args) {
  fs.readdir(".", function (err, files) {
    if (err) throw err;
    done(files.join("\n"));
  });
}

function date(done, args) {
  done(Date());
}

function pwd(done, args) {
  done(process.cwd());
}

module.exports = {
  pwd,
  date,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
  clear,
  wc,
  uniq,
  sort
};



//------------------ Otra forma de hacerlo dentro del objeto a exportar.
// pwd: function (args, done) {
//     done(process.cwd());
//   },
//   date: function (args, done) {
//     done(Date());
//   },
//   ls: function (args, done) {
//     fs.readdir(".", function (err, files) {
//       if (err) throw err;
//       files.forEach(function (file) {
//         process.stdout.write(file.toString() + "\n");
//       });
//       process.stdout.write("prompt > ");
//     });
//   },
//   echo: function (args, done) {
//     done(args.join(" "));
//   }

// let output = "";
//     files.forEach(function (file, index) {
//       output += (index === 0 ? "" : "\n") + file.toString();
//     });
//     done(output);
//   });
// }
