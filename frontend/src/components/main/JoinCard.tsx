import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Collapse,
    Divider,
    IconButton,
    Typography
} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import all from "@material-ui/icons/ExpandMore"
export default function JoinCard() {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader title="Nous rejoindre" titleTypographyProps={{variant: "h5", align: "center"}}/>
            <CardMedia component={Divider}/>
            <CardContent>
                <Typography variant="body1" paragraph>
                    Tous les niveaux sont acceptés.
                    Pour pouvoir postuler, il suffit de jouer à Albion Online, avoir plus de 18 ans et de nous rejoindre sur Discord.
                </Typography>
                <Typography variant="body1">
                    Etendre pour plus d'infos.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMore/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ul>
                    <li>
                        Avoir plus de 18 ans.
                    </li>
                    <li>
                        Rejoindre la guilde sur Discord.
                    </li>
                    <li>
                        Poster un message dans le channel Discord "Entretien de débauche".
                        Essayez de faire un message complet avec les informations suivantes:
                        <ul>
                            <li>
                                Nom (pseudo ou vrai nom), âge
                            </li>
                            <li>
                                Expérience dans les jeux vidéos et MMO en particulier.
                            </li>
                            <li>
                                Description du personnage Albion Online (styles de jeu, préférences, spés
                                principales).
                            </li>
                            <li>
                                Horaires de disponibilités.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Participer à l'entretien vocal de recrutement avec un membre de la guilde.
                    </li>
                </ul>
            </Collapse>
        </Card>
    )
}
