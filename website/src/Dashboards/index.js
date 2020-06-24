// @flow
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from 'routes';
import List from './List';
import Details from './Details';
import css from './styles.module.css';

type Props = {}

const Stacks = ({}: Props) => {
    return (
        <div className={css.dashboards}>
            <Switch>
                <Route path={routes.dashboards()} exact component={List} />
                <Route path={routes.dashboardsDetails()} component={Details} />
            </Switch>
        </div>
    );
};

export default Stacks;
