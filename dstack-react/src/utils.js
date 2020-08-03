import parseSearch from './utils/parseSearch';
import getDataFailedRequest from './utils/getDataFailedRequest';
import unicodeBase64Decode from './utils/unicodeBase64Decode';
import formatBytes from './utils/formatBytesSize';
import downloadFile from './utils/downloadFile';
import parseStackParams from './utils/parseStackParams';
import getFormattedDuration from './utils/getFormattedDuration';
import fileToBaseTo64 from './utils/fileToBaseTo64';

const isSignedIn = () => {
    const token = localStorage.getItem('token');

    return Boolean(token && token.length);
};

export {
    isSignedIn,
    downloadFile,
    formatBytes,
    parseSearch,
    getDataFailedRequest,
    unicodeBase64Decode,
    parseStackParams,
    getFormattedDuration,
    fileToBaseTo64
};
