const typeMap = {
    'TextFieldView': 'text',
    'ComboBoxView': 'select',
    'SliderView': 'slider',
    'CheckBoxView': 'checkbox',
    'ApplyView': 'apply',
};

export default views => {
    const fields = {};

    views.forEach((view, index) => {
        fields[index] = {
            label: view.label,
            type: typeMap[view.type],
            value: view.data,
            disabled: !view.enabled,
        };

        if (view.type === 'CheckBoxView')
            fields[index].value = view.selected;

        if (view.type === 'ComboBoxView') {
            fields[index].options = view.titles.map((title, i) => ({
                label: title,
                value: i,
            }));

            fields[index].value = view.selected;
        }

        if (view.type === 'SliderView') {
            fields[index].options = {};
            view.data.forEach(item => fields[index].options[item] = item);

            fields[index].min = Math.min.apply(null, view.data);
            fields[index].max = Math.max.apply(null, view.data);
            fields[index].value = view.data[view.selected];
        }
    });

    return fields;
};
