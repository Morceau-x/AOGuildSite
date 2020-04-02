import React from 'react';
import { ButtonBase, ExtendButtonBase, Icon, IconButton, Tooltip } from '@material-ui/core';
import { Action } from 'material-table';

type DataType<RowData extends object> = RowData[] | RowData;
type WrappedAction<RowData extends object> = { action?: (_: DataType<RowData>) => Action<RowData> };

interface MaterialTableActionProps<RowData extends object> {
    action: Action<RowData> | WrappedAction<RowData> | ((_: DataType<RowData>) => Action<RowData>);
    data?: DataType<RowData>;
    disabled?: boolean;
    size?: string;
}

type MaterialTableAction<RowData extends object> = (props: MaterialTableActionProps<RowData>) => React.ReactElement;

export default class MaterialTableActionBuilder<RowData extends object> {
    stdActionTransforms: Map<
        string,
        (
            action: Action<RowData>,
            handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
            disabled: boolean
        ) => { action: Action<RowData>; button?: JSX.Element } | undefined
    >;

    constructor() {
        this.stdActionTransforms = new Map([
            ['Add', undefined],
            ['Check', undefined],
            ['Clear', undefined],
            ['Delete', undefined],
            ['DetailPanel', undefined],
            ['Edit', undefined],
            ['Export', undefined],
            ['Filter', undefined],
            ['FirstPage', undefined],
            ['SortArrow', undefined],
            ['LastPage', undefined],
            ['NextPage', undefined],
            ['PreviousPage', undefined],
            ['ResetSearch', undefined],
            ['Search', undefined],
            ['ThirdStateCheck', undefined],
            ['ViewColumn', undefined],
        ]);
    }

    addStandardActionTransform = (
        standardAction: string,
        transform: (
            action: Action<RowData>,
            handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
            disabled: boolean
        ) => { action: Action<RowData>; button?: JSX.Element }
    ): this => {
        if (this.stdActionTransforms.has(standardAction)) this.stdActionTransforms.set(standardAction, transform);
        return this;
    };

    build = (stdActionTransforms = this.stdActionTransforms): MaterialTableAction<RowData> => {
        return function (props: MaterialTableActionProps<RowData>) {
            let action: Action<RowData> = undefined;
            let transformedButton = undefined;
            if (typeof props.action == 'function') {
                action = props.action(props.data);
                if (!action) {
                    return null;
                }
            } else if (props.action.hasOwnProperty('action')) {
                // @ts-ignore
                action = props.action.action(props.data);
                if (!action) {
                    return null;
                }
            } else {
                // @ts-ignore
                action = props.action;
            }

            if (action.hidden) {
                return null;
            }

            const disabled = action.disabled || props.disabled;

            const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
                if (action.onClick) {
                    action.onClick(event, props.data);
                    event.stopPropagation();
                }
            };

            if (stdActionTransforms.has(action.tooltip)) {
                const transform = stdActionTransforms.get(action.tooltip);
                if (transform) {
                    const tr = transform(action, handleOnClick, disabled);
                    action = tr.action;
                    transformedButton = tr.button;
                }
            }

            let element: React.ReactElement = undefined;
            if (typeof action.icon == 'string') element = <Icon {...action.iconProps}>{action.icon}</Icon>;
            else if (typeof action.icon == 'function') {
                // @ts-ignore
                element = action.icon({ ...action.iconProps, disabled: disabled });
            }
            // @ts-ignore
            else element = <action.icon />;

            const button = transformedButton ? (
                transformedButton
            ) : (
                <IconButton color="inherit" disabled={disabled} onClick={handleOnClick}>
                    {element}
                </IconButton>
            );
            if (action.tooltip) {
                return disabled ? (
                    <Tooltip title={action.tooltip}>
                        <span>{button}</span>
                    </Tooltip>
                ) : (
                    <Tooltip title={action.tooltip}>{button}</Tooltip>
                );
            } else {
                return button;
            }
        };
    };
}
