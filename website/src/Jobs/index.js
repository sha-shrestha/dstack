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
        <div className={css.jobs}>
            <Switch>
                <Route path={routes.jobs()} exact component={List} />
                <Route path={routes.jobsDetails()} component={Details} />
            </Switch>
        </div>
    );
};

export default Stacks;
