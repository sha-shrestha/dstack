// @flow
import React, {useEffect, useState, Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import Button from '../../Button';
import Modal from '../../Modal';
import SearchField from '../../SearchField';
import CheckboxField from '../../CheckboxField';
import StackListItem from '../../stack/ListItem';
import Loader from './Loader';
import css from './style.module.css';

type Props = {
    currentUser?: string,
    isShow?: boolean,
    stacks?: Array<{}>,
    loading?: boolean,
    fetchList: Function,
    onAddStacks?: Function,
    onClose: Function,
}

const AddStacksModal = ({
    stacks = [],
    loading,
    isShow,
    onClose,
    onAddStacks,
    currentUser,
    user,
}: Props) => {
    const {t} = useTranslation();
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (!isShow) {
            setSelected([]);
            setSearchQuery('');
        }
    }, [isShow]);

    const getItems = () => {
        let items = [];

        if (stacks && stacks.length) {
            if (searchQuery.length)
                items = stacks.filter(i => i.name.indexOf(searchQuery) >= 0);
            else
                items = stacks;
        }

        return items;
    };

    const items = getItems();

    const onChangeSearch = value => setSearchQuery(value);

    const getFullStackName = stack => `${stack.user}/${stack.name}`;

    const isChecked = stack => {
        const stackName = getFullStackName(stack);

        return selected.findIndex(i => i === stackName) >= 0;
    };

    const getOnClickStack = stack => () => {
        const stackName = getFullStackName(stack);

        if (isChecked(stack)) {
            const filtered = selected.filter(i => i !== stackName);

            setSelected(filtered);
        } else {
            setSelected([
                ...selected,
                stackName,
            ]);
        }
    };

    const submit = () => {
        if (onAddStacks)
            onAddStacks(selected);

        onClose();
    };

    return (
        <Modal
            dialogClassName={css.stacks}
            isShow={isShow}
            title={t('selectStacks')}
            onClose={onClose}
            withCloseButton
        >
            {!loading && Boolean(stacks.length) && (
                <SearchField
                    className={css.search}
                    isDark
                    size="middle"
                    showEverything
                    placeholder={t('findStack')}
                    value={searchQuery}
                    onChange={onChangeSearch}
                />
            )}

            {loading && <Loader />}

            {!loading && !stacks.length && (
                <div className={css.message}>
                    {user === currentUser
                        ? t('youHaveNoStacksYet')
                        : t('theUserHasNoStacksYetByName', {name: params.user})
                    }
                </div>
            )}

            {!loading && Boolean(stacks.length && !items.length) && (
                <div className={css.text}>
                    {t('noStacksAreFoundedMatchedTheSearchCriteria')}
                </div>
            )}

            {!loading && Boolean(stacks.length && items.length) && (
                <Fragment>
                    <div className={css.grid}>
                        {items.map((item, index) => (
                            <div className={css.item} key={index} onClick={getOnClickStack(item)}>
                                <CheckboxField
                                    className={css.checkbox}
                                    value={isChecked(item)}
                                    readOnly
                                />

                                <StackListItem
                                    data={item}
                                    otherOwner={params.user !== item.user}
                                />
                            </div>
                        ))}
                    </div>

                    <div className={css.buttons}>
                        <Button
                            className={css.button}
                            color="primary"
                            variant="contained"
                            disabled={!selected.length}
                            onClick={submit}
                        >
                            {t('addSelectedStacks')}
                        </Button>

                        <Button
                            className={css.button}
                            color="secondary"
                            variant="contained"
                            onClick={onClose}
                        >
                            {t('cancel')}
                        </Button>
                    </div>
                </Fragment>

            )}
        </Modal>
    );
};

export default AddStacksModal;
