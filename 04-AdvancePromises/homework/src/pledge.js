"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function");
  }
  this._state = "pending";
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
  //executor(data => this._internalResolve(data), reason => this._internalReject(reason)); Otra forma de hacerlo
}

$Promise.prototype._internalResolve = function (value) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = value;
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = reason;
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") {
    successCb = false;
  }
  if (typeof errorCb !== "function") {
    errorCb = false;
  }

  const downstreamPromise = new $Promise(function () {});

  this._handlerGroups.push({
    successCb,
    errorCb,
    downstreamPromise,
  });
  if (this._state !== "pending") {
    this._callHandlers();
  }
  return downstreamPromise;
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};

$Promise.prototype._callHandlers = function (handlerGroup, value) {
  while (this._handlerGroups.length > 0) {
    let item = this._handlerGroups.shift();
    if (this._state === "fulfilled") {
      //item.successCb && item.successCb(this._value);
      if (!item.successCb) {
        item.downstreamPromise._internalResolve(this._value);
      } else {
        try {
          const result = item.successCb(this._value);
          if (result instanceof $Promise) {
            result.then(
              (value) => item.downstreamPromise._internalResolve(value),
              (reason) => item.downstreamPromise._internalReject(reason)
            );
          } else {
            item.downstreamPromise._internalResolve(result);
          }
        } catch (error) {
          item.downstreamPromise._internalReject(error);
        }
      }
    } else {
      //item.errorCb && item.errorCb(this._value);
      if (!item.errorCb) {
        item.downstreamPromise._internalReject(this._value);
      } else {
        try {
          const result = item.errorCb(this._value);
          if (result instanceof $Promise) {
            result.then(
              (value) => item.downstreamPromise._internalResolve(value),
              (reason) => item.downstreamPromise._internalReject(reason)
            );
          } else {
            item.downstreamPromise._internalResolve(result);
          }
        } catch (error) {
          item.downstreamPromise._internalReject(error);
        }
      }
    }
  }
};

$Promise.resolve = function (value) {
  if (value instanceof $Promise) {
    return value;
  }
  const promise = new $Promise(() => {});

  promise._internalResolve(value);

  return promise;
};

$Promise.all = function (array) {
  if (!Array.isArray(array)) throw new TypeError();
  const promise = new $Promise((resolve, reject) => {
    const promiseArray = array.map((promise) => $Promise.resolve(promise));
    const results = Array(array.length);
    let pendingCount = array.length;
    promiseArray.forEach((promise, i) =>
      promise.then(
        (value) => {
          results[i] = value;
          pendingCount--;
          if (pendingCount === 0) {
            resolve(results);
          }
        },
        (error) => reject(error)
      )
    );
  });

  return promise;
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
