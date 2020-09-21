
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { makeStyles, getContrastRatio } from '@material-ui/core/styles';
import {addToCart} from "../Actions/Actions";
import {removeFromCart} from "../Actions/Actions";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
   
    margin : "10px",

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const CourseCard = ({course, goto}) => {
    const cart = useSelector (store => store.cartReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = useState (false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const handleAdd = () => {
        if (cart.includes(course) ){
            dispatch ({type : removeFromCart , payload: course});
        }
        else {
        dispatch ({type : addToCart , payload: course});
        }

    }

    return ( 
        <div className = "col-12 ">
        <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="course" className={classes.avatar}>
            {course.number}
          </Avatar>
        }
        action={
          <IconButton 
          onClick = {handleAdd}
           aria-label="add">
               {!cart.includes(course) ? <AddIcon /> : <DeleteIcon />}
          </IconButton>
        }
        title={course.dept}
      />
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {course.title}
        </Typography>
     
      </CardContent>
      <CardActions disableSpacing>
       
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            {course.description}
          </Typography>
          
          <button onClick = {() => {goto(`/course/${course.number}`);}}  className="btn btn-primary">
            view more
          </button>
         
        </CardContent>
      </Collapse>
    </Card>
    </div>
     );
}
 
export default CourseCard;