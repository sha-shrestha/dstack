import parseSearch from './utils/parseSearch';
import getDataFailedRequest from './utils/getDataFailedRequest';
import unicodeBase64Decode from './utils/unicodeBase64Decode';
import formatBytes from './utils/formatBytesSize';
import downloadFile from './utils/downloadFile';
import parseStackParams from './utils/parseStackParams';
import parseStackTabs from './utils/parseStackTabs';
import getFormattedDuration from './utils/getFormattedDuration';
import fileToBaseTo64 from './utils/fileToBaseTo64';
import dataFetcher from './utils/dataFetcher';
import config from './config';

const isSignedIn = () => {
    const token = localStorage.getItem(config.TOKEN_STORAGE_KEY);

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
    parseStackTabs,
    getFormattedDuration,
    fileToBaseTo64,
    dataFetcher
};
