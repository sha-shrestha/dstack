// @flow
import React from 'react';
import RcTooltip from 'rc-tooltip';
import css from './style.module.css';

type Props = {
    children: any,
    overlayContent?: any,
    arrowContent?: any,
}

const Tooltip = ({
    children,
    overlayContent,
    arrowContent = null,
    placement = 'bottomLeft',
    trigger = ['hover'],
    overlayStyle = {'pointer-events': 'none'},
    getTooltipContainer = () => document.querySelector('#root'),
    ...props
}: Props) => {

    return (
        <RcTooltip
            overlayStyle={overlayStyle}
            arrowContent={arrowContent}
            placement={placement}
            trigger={trigger}
            getTooltipContainer={getTooltipContainer}
            overlay={
                <div className={css.tooltip}>{overlayContent}</div>
            }
            {...props}
        >
            {children}
        </RcTooltip>
    );
};

export default Tooltip;