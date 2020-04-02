import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Divider,
    Grid,
    Typography,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
// @ts-ignore
import banner from '../../../public/images/banner.png';
import JoinCard from './JoinCard';
import { TwitchIcon, YoutubeIcon } from '../common/icons/SocialIcons';

const useStyles = makeStyles((theme) => ({
    gridItem: {
        padding: '1% 2%',
        height: 'auto',
    },
    box: {
        width: 'auto',
    },
    titleBanner: {
        width: 'auto',
        height: 'auto',
        padding: '2% 3%',
        margin: '0 0',
        backgroundColor: theme.palette.primary.light,
    },
    paperItem: {
        width: 'auto',
        height: '100%',
        padding: '2% 3%',
        margin: '0 0',
        backgroundColor: theme.palette.secondary.light,
    },
}));

const title = (
    <Card>
        <CardMedia component="img" image={banner} title="Banner" />
        <CardContent>
            <Typography variant="h4" align="center" display="block" color="primary">
                Bienvenue au Tonneau Sans Fond
            </Typography>
        </CardContent>
    </Card>
);

const description = (
    <Card>
        <CardHeader title="Qui sommes nous?" titleTypographyProps={{ variant: 'h5', align: 'center' }} />
        <CardMedia component={Divider} />
        <CardContent>
            <Typography variant="body1" paragraph>
                Guilde française sur le jeu Albion Online
            </Typography>
            <Typography variant="body1" paragraph>
                Basée à TSF
            </Typography>
            <Typography variant="body1" paragraph>
                blablabla
            </Typography>
            <Typography variant="body1" paragraph>
                ...
            </Typography>
        </CardContent>
    </Card>
);

const follow = (
    <Card>
        <CardHeader title="Nous suivre" titleTypographyProps={{ variant: 'h5', align: 'center' }} />
        <CardMedia component={Divider} />
        <CardContent style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Typography variant="body1" paragraph={true}>
                <Button href="https://www.twitch.tv/le_tonneau_sans_fond">
                    <TwitchIcon style={{ fontSize: 100 }} />
                </Button>
                <Button href="https://www.youtube.com/channel/UCey2TyGsxuDNf3rK8F433mA">
                    <YoutubeIcon style={{ fontSize: 100 }} />
                </Button>
            </Typography>
        </CardContent>
    </Card>
);

const values_rules = (
    <Card>
        <CardHeader title="Nos valeurs et règles" titleTypographyProps={{ variant: 'h5', align: 'center' }} />
        <CardMedia component={Divider} />
        <CardContent>
            <Typography variant="body1" paragraph>
                Au Tonneau très peu de règles si ce n'est le respect des autres et la sympathie !
            </Typography>
            <Typography variant="body1" paragraph>
                Le Tonneau Sans Fond n'exigera jamais de toi que tu viennes à un event (sauf si tu t'y es engagé).
            </Typography>
            <Typography variant="body1" paragraph>
                Tu choisis quand tu joues et ce à quoi tu participes. Tu n'as donc aucune obligation de connexion.
            </Typography>
            <Typography variant="body1" paragraph>
                Le Tonneau Sans Fond n'exigera jamais de toi des quotas de dons.
            </Typography>
            <Typography variant="body1" paragraph>
                Chacun au Tonneau Sans Fond a la droit de donner son avis tant que c'est fait dans le respect de chacun.
            </Typography>
            <Typography variant="body1" paragraph>
                Venir en vocal sur Dicord est obligatoire (au moins en écoute) si tu participes à des events ou du jeu
                en groupe. Discord est vivement conseillé en dehors de ces moments afin de créer du lien avec tes
                camarades!
            </Typography>
        </CardContent>
    </Card>
);

const activities = (
    <Card>
        <CardHeader title="Les activités de la guilde" titleTypographyProps={{ variant: 'h5', align: 'center' }} />
        <CardMedia component={Divider} />
        <CardContent>
            <Typography variant="body1" paragraph>
                La guilde essaie de proposer des activités variées et adaptées aux attentes des membres. C'est dans
                "Annonce event" que nous ferons des annonces précises et personnalisées pour chaque event.
            </Typography>
            <Typography variant="body1" paragraph>
                Aucun event n'est obligatoire, et toutes les propositions sont bonnes à prendre pour trouver de
                nouvelles activités ! Tu remarqueras qu'il n'y a pas d'event chaque soir, nous laissons volontairement
                des soirs libres pour laisser les joueurs faire ce qu'ils veulent. C'est l'occasion de proposer des
                activités que tu veux faire sur le moment aux autres. C'est pourquoi le discord est important aussi en
                dehors des events : il permet de plus facilement proposer des activités aux autres les soirs libres.
            </Typography>
        </CardContent>
    </Card>
);

export default function MainPage() {
    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <Grid container alignContent="flex-start">
                <Grid item xs={12} className={classes.gridItem}>
                    {title}
                </Grid>
                <Grid item md={7} xs={12} className={classes.gridItem}>
                    {description}
                </Grid>
                <Grid item md={5} xs={12} className={classes.gridItem}>
                    <JoinCard />
                </Grid>
                <Grid item md={8} xs={12} className={classes.gridItem}>
                    {values_rules}
                </Grid>
                <Grid item md={4} xs={12} className={classes.gridItem}>
                    {follow}
                </Grid>
                <Grid item md={8} xs={12} className={classes.gridItem}>
                    {activities}
                </Grid>
            </Grid>
        </Container>
    );
}
