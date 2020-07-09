import parseSearch from './parseSearch';
import getDataFailedRequest from './getDataFailedRequest';
import unicodeBase64Decode from './unicodeBase64Decode';
import formatBytes from './formatBytesSize';
import downloadFile from './downloadFile';
import parseStackParams from './parseStackParams';
import getFormattedDuration from './getFormattedDuration';
import fileToBaseTo64 from './fileToBaseTo64';

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
