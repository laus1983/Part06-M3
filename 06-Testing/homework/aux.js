// function sumArray(array, num) {
//   return new Promise((resolve, reject) => {
//     if (!Array.isArray(array) || typeof num !== 'number') return reject();
//     for (var i = 0; i < array.length; i++) {
//         for (var j = i + 1; j < array.length; j++) {
//             if (array[i] + array[j] === num) return resolve(true);
//         }
//     }
//     return resolve(false);
//     });
// }

function sumArray(array, num) {
    for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i] !== array[j]){
                if (array[i] + array[j] === num) return true;
            }
        }
    }
    return false;
}

function pluck(array, prop){
    return array.map(p => p[prop]);
}

module.exports = {
    sumArray,
    pluck
}