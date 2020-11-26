import apiFabric from '../apiFabric';
import {useAppStore} from '../AppStore';
import config from '../config';

const api = apiFabric();

type executeParams = {
    user: string,
    stack: string,
    frame: string,
    attachment: number,
    apply?: boolean,
    views: Array<{}>,
}

export default () => {
    const [{apiUrl}] = useAppStore();

    const executeStack = (params: executeParams) => {
        return new Promise(async resolve => {
            try {
                const request = await api.post(apiUrl + config.APPS_EXECUTE, params);

                resolve(request.data);
            } catch (e) {
                resolve({});
            }
        });
    };

    const pollStack = ({id}: {id: string}) => {
        return new Promise(async resolve => {
            try {
                const request = await api.get(apiUrl + config.APPS_POLL + `?id=${id}`);

                resolve(request.data);
            } catch (e) {
                resolve({});
            }
        });
    };

    return {executeStack, pollStack};
};
