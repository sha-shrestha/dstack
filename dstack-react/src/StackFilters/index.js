// @flow
import React, {useMemo} from 'react';
import cx from 'classnames';
import {useTranslation} from 'react-i18next';
import SelectField from '../SelectField';
import CheckboxField from '../CheckboxField';
import SliderField from '../SliderField';
import TextField from '../TextField';
import Button from '../Button';
import css from './styles.module.css';

type Props = {
    fields: {},
    form: {},
    onChange: Function,
    className?: string,
}

const StackFilters = ({className, fields, form, onChange, onApply, disabled}: Props) => {
    const {t} = useTranslation();
    const hasSelectField = useMemo(
        () => Object.keys(fields).some(key => fields[key].type === 'select'),
        [fields],
    );

    if (!Object.keys(fields).length)
        return null;

    return (
        <div className={cx(css.filters, className, {'with-select': hasSelectField})}>
            {Object.keys(fields).map(key => {
                switch (fields[key].type) {
                    case 'text':
                        return <TextField
                            size="small"
                            key={`text-${key}`}
                            className={cx(css.field)}
                            onChange={event => onChange(key, event.target.value)}
                            label={fields[key].label}
                            name={key}
                            value={form[key]}
                            disabled={disabled || fields[key].disabled}
                        />;

                    case 'select':
                        return <SelectField
                            key={`select-${key}`}
                            align="bottom"
                            className={cx(css.field, css.select)}
                            onChange={value => onChange(key, value)}
                            label={fields[key].label}
                            name={key}
                            options={fields[key].options}
                            value={Array.isArray(form[key]) ? form[key] : [form[key]]}
                            disabled={disabled || fields[key].disabled}
                        />;

                    case 'checkbox':
                        return <CheckboxField
                            key={`checkbox-${key}`}
                            className={css.field}
                            onChange={onChange}
                            label={fields[key].label}
                            name={key}
                            value={form[key]}
                            disabled={disabled || fields[key].disabled}
                        />;

                    case 'slider':
                        return <SliderField
                            key={`slider-${key}`}
                            className={css.field}
                            onChange={onChange}
                            align="right"
                            label={fields[key].label}
                            name={key}
                            value={form[key]}
                            step={null}
                            min={fields[key].min}
                            max={fields[key].max}
                            marks={fields[key].options}
                            disabled={disabled || fields[key].disabled}
                        />;

                    case 'apply':
                        return <div
                            key={`apply-${key}`}
                            className={cx(css.field, css.button)}
                        >
                            {onApply && (
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    onClick={onApply}
                                    disabled={disabled || fields[key].disabled}
                                >
                                    {t('apply')}
                                </Button>
                            )}

                        </div>;

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default StackFilters;
