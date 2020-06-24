import {useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import config from 'config';

GoogleAnalytics.initialize(config.GA_ID);

const trackPage = page => {
    GoogleAnalytics.set({page});
    GoogleAnalytics.pageview(page);
};

const useTracking = () => {
    const {listen, location} = useHistory();
    const didMount = useRef(false);

    if (!didMount.current) {
        trackPage(location.pathname + location.search);
        didMount.current = true;
    }

    useEffect(() => {
        return listen(location => trackPage(location.pathname + location.search));
    }, [listen]);
};

export default useTracking;