import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

/**
 * @param {
     title : string
     desc : string
 } props
 */

export default function CourseCard(props) {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardActionArea onClick={e => {
          props.onClick()
        }}>
          <CardMedia
            className={classes.media}
            image={props.cover?.url || null}
            title="course_cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.desc}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button size="small" color="primary">
            Add Course Outline
          </Button> */}
          <Button onClick={e => {
            props.onEdit()
          }} size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
