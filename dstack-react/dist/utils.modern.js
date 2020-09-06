import { get } from 'lodash-es';
import moment from 'moment';

const parseSearch = searchString => {
  const search = searchString.substring(1);
  let params = {};
  if (!search.length) return params;

  try {
    params = JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  } catch (e) {
    params = {};
  }

  return params;
};

const getDataFailedRequest = responseError => {
  let error = 'Unknown error';

  try {
    error = JSON.parse(get(responseError, 'request.response')).message;
  } catch (e) {
    console.log(error, e);
  }

  const requestStatus = get(responseError, 'request.status');

  return {
    error,
    requestStatus
  };
};

const unicodeBase64Decode = text => {
  try {
    const decodeData = window.atob(text);
    return decodeURIComponent(Array.prototype.map.call(decodeData, c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    return null;
  }
};

const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return '0 Bytes';
  let k = 1024;
  let dm = decimals <= 0 ? 0 : decimals || 2;
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const downloadFile = ({
  url,
  blob,
  type,
  fileName
}) => {
  if (blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([blob]));
    link.setAttribute('target', '_blank');
    link.setAttribute('download', fileName);
    link.setAttribute('type', type);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  if (url) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('target', '_blank');
    link.setAttribute('download', true);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }
};

var parseStackParams = (attachments => {
  const fields = {};
  if (!attachments || !attachments.length) return;
  attachments.forEach(i => {
    Object.keys(i.params).forEach(key => {
      if (fields[key]) fields[key].options.push(i.params[key]);else fields[key] = {
        options: [i.params[key]]
      };
    });
  });
  Object.keys(fields).forEach(key => {
    if (typeof fields[key].options[0] === 'string') {
      fields[key].type = 'select';
      fields[key].options = fields[key].options.filter((a, b) => fields[key].options.indexOf(a) === b).map(i => ({
        label: i,
        value: i
      }));
    }

    if (typeof fields[key].options[0] === 'boolean') {
      fields[key].type = 'checkbox';
    }

    if (typeof fields[key].options[0] === 'number') {
      const options = fields[key].options;
      fields[key].type = 'slider';
      fields[key].min = Math.min.apply(null, options);
      fields[key].max = Math.max.apply(null, options);
      fields[key].options = {};
      options.filter((a, b) => options.indexOf(a) === b).forEach(i => fields[key].options[i] = i);
    }
  });
  return fields;
});

var getFormattedDuration = (duration => {
  if (duration < 1000) return '0sec';
  let string = '';
  const momentDuration = moment.duration(duration);
  const hours = momentDuration.hours();
  const minutes = momentDuration.minutes();
  const seconds = momentDuration.seconds();
  if (hours) string += `${moment.duration(hours, 'hours').as('hours')}h`;
  if (minutes) string += ` ${moment.duration(minutes, 'minutes').as('minutes')}min`;
  if (seconds) string += ` ${moment.duration(seconds, 'seconds').asSeconds()}sec`;
  return string;
});

const fileToBase64 = async file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result.split(',')[1]);

  reader.onerror = error => reject(error);
});

const isSignedIn = () => {
  const token = localStorage.getItem('token');
  return Boolean(token && token.length);
};

export { downloadFile, fileToBase64 as fileToBaseTo64, formatBytes, getDataFailedRequest, getFormattedDuration, isSignedIn, parseSearch, parseStackParams, unicodeBase64Decode };
//# sourceMappingURL=utils.modern.js.map
