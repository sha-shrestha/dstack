import { get } from 'lodash-es';
import moment from 'moment';

var parseSearch = function parseSearch(searchString) {
  var search = searchString.substring(1);
  var params = {};
  if (!search.length) return params;

  try {
    params = JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  } catch (e) {
    params = {};
  }

  return params;
};

var getDataFailedRequest = function getDataFailedRequest(responseError) {
  var error = 'Unknown error';

  try {
    error = JSON.parse(get(responseError, 'request.response')).message;
  } catch (e) {
    console.log(error, e);
  }

  var requestStatus = get(responseError, 'request.status');

  return {
    error: error,
    requestStatus: requestStatus
  };
};

var unicodeBase64Decode = function unicodeBase64Decode(text) {
  try {
    var decodeData = window.atob(text);
    return decodeURIComponent(Array.prototype.map.call(decodeData, function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    return null;
  }
};

var formatBytes = function formatBytes(bytes, decimals) {
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var dm = decimals <= 0 ? 0 : decimals || 2;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

var downloadFile = function downloadFile(_ref) {
  var url = _ref.url,
      blob = _ref.blob,
      type = _ref.type,
      fileName = _ref.fileName;

  if (blob) {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([blob]));
    link.setAttribute('target', '_blank');
    link.setAttribute('download', fileName);
    link.setAttribute('type', type);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  if (url) {
    var _link = document.createElement('a');

    _link.href = url;

    _link.setAttribute('target', '_blank');

    _link.setAttribute('download', true);

    document.body.appendChild(_link);

    _link.click();

    _link.parentNode.removeChild(_link);
  }
};

var parseStackParams = (function (attachments) {
  var fields = {};
  if (!attachments || !attachments.length) return;
  attachments.forEach(function (i) {
    Object.keys(i.params).forEach(function (key) {
      if (fields[key]) fields[key].options.push(i.params[key]);else fields[key] = {
        options: [i.params[key]]
      };
    });
  });
  Object.keys(fields).forEach(function (key) {
    if (typeof fields[key].options[0] === 'string') {
      fields[key].type = 'select';
      fields[key].options = fields[key].options.filter(function (a, b) {
        return fields[key].options.indexOf(a) === b;
      }).map(function (i) {
        return {
          label: i,
          value: i
        };
      });
    }

    if (typeof fields[key].options[0] === 'boolean') {
      fields[key].type = 'checkbox';
    }

    if (typeof fields[key].options[0] === 'number') {
      var options = fields[key].options;
      fields[key].type = 'slider';
      fields[key].min = Math.min.apply(null, options);
      fields[key].max = Math.max.apply(null, options);
      fields[key].options = {};
      options.filter(function (a, b) {
        return options.indexOf(a) === b;
      }).forEach(function (i) {
        return fields[key].options[i] = i;
      });
    }
  });
  return fields;
});

var getFormattedDuration = (function (duration) {
  if (duration < 1000) return '0sec';
  var string = '';
  var momentDuration = moment.duration(duration);
  var hours = momentDuration.hours();
  var minutes = momentDuration.minutes();
  var seconds = momentDuration.seconds();
  if (hours) string += moment.duration(hours, 'hours').as('hours') + "h";
  if (minutes) string += " " + moment.duration(minutes, 'minutes').as('minutes') + "min";
  if (seconds) string += " " + moment.duration(seconds, 'seconds').asSeconds() + "sec";
  return string;
});

var fileToBase64 = function fileToBase64(file) {
  try {
    return Promise.resolve(new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        return resolve(reader.result.split(',')[1]);
      };

      reader.onerror = function (error) {
        return reject(error);
      };
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var isSignedIn = function isSignedIn() {
  var token = localStorage.getItem('token');
  return Boolean(token && token.length);
};

export { downloadFile, fileToBase64 as fileToBaseTo64, formatBytes, getDataFailedRequest, getFormattedDuration, isSignedIn, parseSearch, parseStackParams, unicodeBase64Decode };
//# sourceMappingURL=utils.modern.js.map
