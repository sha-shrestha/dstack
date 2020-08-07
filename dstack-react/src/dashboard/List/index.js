// @flow
import React, {useState} from 'react';
import cx from 'classnames';
import {useTranslation} from 'react-i18next';
import SearchField from '../../SearchField';
import Yield from '../../Yield';
import DashboardListItem from '../ListItem';
import Loader from './components/Loader';
import css from './styles.module.css';

type Props = {
    addDashboard: Function,
    addDashboardDisable: boolean,
    currentUser?: string,
    data: ?Array<{}>,
    deleteDashboard: Function,
    loading: boolean,
    user: string,
}

const List = ({
    addDashboard,
    addDashboardDisable,
    currentUser,
    data,
    deleteDashboard,
    loading,
    user,
}: Props) => {
    const [search, setSearch] = useState('');
    const {t} = useTranslation();

    const onChangeSearch = value => setSearch(value);

    const getItems = () => {
        let items = [];

        if (data && data.length) {
            if (search.length)
                items = data.filter(i => i.title.indexOf(search) >= 0);
            else
                items = data;
        }

        return items;
    };

    const items = getItems();

    if (loading)
        return <Loader />;

    return (
        <div className={css.list}>
            <Yield name="header-yield">
                <SearchField
                    showEverything
                    isDark
                    className={css.search}
                    placeholder={t('findDashboard')}
                    size="small"
                    value={search}
                    onChange={onChangeSearch}
                />
            </Yield>

            <div className={css.title}>
                {currentUser === user
                    ? t('myDashboards')
                    : t('dashboardsOf', {name: user})
                }

                {data && Boolean(data.length) && <span>{data.length}</span>}
            </div>

            {data && Boolean(data.length) && <SearchField
                placeholder={t('search')}
                className={css.mobileSearch}
                showEverything
                size="small"
                value={search}
                onChange={onChangeSearch}
            />}

            <div className={css.grid}>
                {currentUser === user && (
                    <div
                        onClick={addDashboard}
                        className={cx(css.add, {disabled: addDashboardDisable})}
                    >
                        <div className={css.caption}>
                            <span className="mdi mdi-plus" />
                            {t('newDashboard')}
                        </div>
                    </div>
                )}

                {items.map((item, index) => (
                    <DashboardListItem
                        key={index}
                        user={user}
                        dashboard={item}
                        deleteDashboard={currentUser === item.user && deleteDashboard}
                    />
                ))}
            </div>
        </div>
    );
};

export default List;
