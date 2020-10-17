import {apiFabric} from '@dstackai/dstack-react';
import config from 'config';

const api = apiFabric({apiUrl: config.API_URL});

const JOB_DEFAULT_ESTIMATED_DURATION = 600000;

export const fetchJob = ({user, id}) => {
    return new Promise(async resolve => {
        try {
            const request = await api.get(config.JOB_DETAILS(user, id));

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};

export const runJob = params => {
    return new Promise(async resolve => {
        try {
            const request = await api.post(config.JOB_RUN, params);

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};

export const stopJob = params => {
    return new Promise(async resolve => {
        try {
            const request = await api.post(config.JOB_STOP, params);

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};

export const createJob = params => {
    return new Promise(async resolve => {
        try {
            const request = await api.post(config.JOB_CREATE, params);

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};

export const updateJob = params => {
    return new Promise(async resolve => {
        try {
            const request = await api.post(config.JOB_UPDATE, params);

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};

export const removeJob = params => {
    return new Promise(async resolve => {
        try {
            const request = await api.post(config.JOB_DELETE, params);

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};

export const calculateJobProgress = (job: {
    'estimated_duration'?: ?number,
    started: number,
}) => {
    const estimatedDuration = job['estimated_duration'] || JOB_DEFAULT_ESTIMATED_DURATION;
    const currentDuration = Date.now() - job.started;
    const leftDuration = estimatedDuration - currentDuration;
    const progress = Math.min(currentDuration / estimatedDuration * 100, 100).toFixed();

    return [progress, leftDuration];
};