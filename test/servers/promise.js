module.exports = function (req, res) {
  return new Promise(function (resolve, reject) {
    res.setHeader('Content-Type', 'text/plain; charset=utf8');
    resolve('Hello world!');
  });
};
