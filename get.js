//
// Pequeña biblioteca para realizar pedidos HTTP
//

var axios = require('axios');

module.exports = function (url, parameters, timeout) {
  
  return axios.get(url, {
    params: parameters,
    timeout:timeout
  });
};
