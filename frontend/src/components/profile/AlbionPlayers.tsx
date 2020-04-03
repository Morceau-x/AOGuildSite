import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remoteAddAlbionPlayerAction, remoteFetchAlbionPlayerAction, remoteRemoveAlbionPlayerAction } from '../../store/userdata/UserDataActions';
import MaterialTable from 'material-table';
import { UserDataState } from '../../store/userdata/UserDataTypes';
import { Button, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MaterialTableActionBuilder from '../common/MaterialTableActionBuilder';
import { Add } from '@material-ui/icons';

const never = () => false;

const columns = [
    {
        title: 'Nom',
        field: 'name',
    },
    {
        title: 'Guilde',
        field: 'guild',
        editable: never,
    },
    {
        title: 'Morts',
        field: 'deathFame',
        editable: never,
    },
    {
        title: 'Kills',
        field: 'killFame',
        editable: never,
    },
    {
        title: 'Ratio',
        field: 'fameRatio',
        editable: never,
    },
    {
        title: 'PvE',
        field: 'pveFame',
        editable: never,
    },
    {
        title: 'Récolte',
        field: 'gatheringFame',
        editable: never,
    },
    {
        title: 'Craft',
        field: 'craftingFame',
        editable: never,
    },
];

const useStyles = makeStyles({
    label: {
        textTransform: 'none',
    },
});

export default function PlayersManager() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const players = useSelector((state: { data: UserDataState; [key: string]: any }) => state.data.players);
    useEffect(() => {
        dispatch(remoteFetchAlbionPlayerAction());
    }, []);

    const action = new MaterialTableActionBuilder()
        .addStandardActionTransform('Add', (action, clickEvent, disabled) => {
            action.tooltip = 'Ajoute un de tes personnages Albion';
            return {
                action: action,
                button: (
                    <Button variant="text" endIcon={<Add />} onClick={clickEvent} disabled={disabled} classes={{ label: classes.label }}>
                        <Typography>Ajouter un joueur</Typography>
                    </Button>
                ),
            };
        })
        .build();
    return (
        <MaterialTable
            title="Personnages Albion Online"
            columns={columns}
            data={players}
            options={{
                search: false,
                paging: false,
                draggable: false,
                sorting: false,
            }}
            components={{
                Action: action,
            }}
            editable={{
                isEditable: () => false,
                onRowAdd: async (newData) => {
                    dispatch(remoteAddAlbionPlayerAction(newData.name));
                },
                onRowDelete: async (oldData) => {
                    dispatch(remoteRemoveAlbionPlayerAction(oldData.name));
                },
            }}
        />
    );
}
