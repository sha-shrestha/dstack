// @flow
import React, {useMemo} from 'react';
import cx from 'classnames';
import SelectField from '../SelectField';
import CheckboxField from '../CheckboxField';
import SliderField from '../SliderField';
import css from './styles.module.css';

type Props = {
    fields: {},
    form: {},
    onChange: Function,
    className?: string,
}

const StackFilters = ({className, fields, form, onChange}: Props) => {
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
                    case 'select':
                        return <SelectField
                            key={`select-${key}`}
                            align="bottom"
                            className={cx(css.field, css.select)}
                            onChange={value => onChange(key, value)}
                            label={key}
                            name={key}
                            options={fields[key].options}
                            value={Array.isArray(form[key]) ? form[key] : [form[key]]}
                        />;

                    case 'checkbox':
                        return <CheckboxField
                            key={`checkbox-${key}`}
                            className={css.field}
                            onChange={onChange}
                            label={key}
                            name={key}
                            value={form[key]}
                        />;

                    case 'slider':
                        return <SliderField
                            key={`slider-${key}`}
                            className={css.field}
                            onChange={onChange}
                            align="right"
                            label={key}
                            name={key}
                            value={form[key]}
                            step={null}
                            min={fields[key].min}
                            max={fields[key].max}
                            marks={fields[key].options}
                        />;

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default StackFilters;
