import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Lens } from "../../../components/magicui/lens";
import { BorderBeam } from "../../../components/magicui/border-beam";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }} className='relative !shadow-none p-4 !rounded-2xl'>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        K
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Kolkata"
                subheader="September 14, 2023"
            />
            <Lens
          zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
            <CardMedia
                component="img"
                height="194"
                image="https://www.holidify.com/images/bgImages/KOLKATA.jpg"
                alt="Paella dish"
            />
            </Lens>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod doloribus eum excepturi saepe quia quibusdam eaque cum voluptatum hic. Error expedita adipisci quo odio necessitatibus earum maiores quisquam consequatur pariatur!
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo sint accusamus perferendis eius labore modi nam, possimus eligendi repudiandae quod quidem velit rerum a fugit nihil repellat, ea laborum placeat.
                    </Typography>
                    <Typography paragraph>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio aspernatur ratione nostrum ipsa magni totam tenetur rerum eveniet veritatis quod, doloremque sapiente temporibus vel ducimus voluptate repudiandae perferendis voluptatem similique!
                    </Typography>
                    <Typography paragraph>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque fuga in similique ab et tempore, odio, laboriosam repellat quidem sequi quo quis numquam aut nesciunt eveniet facilis explicabo. Illo, ullam!
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
            <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-blue-500 to-transparent"
      />
        </Card>
    );
}