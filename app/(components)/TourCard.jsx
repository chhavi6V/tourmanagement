import React from 'react';
import { Typography, Grid, Card, CardActions, CardContent, Button, Box} from '@mui/material';
import styles from '../tourcreation/tourcreation.css'
import Link from "next/link";


export default function TourCard({tour}){
    return(
        <Card variant="outlined">
            <React.Fragment>
            <CardContent>
              <Typography variant="h5" component="div">
                {tour.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`${tour.startDate ? new Date(tour.startDate).toLocaleDateString() : ''} - ${tour.endDate ? new Date(tour.endDate).toLocaleDateString() : ''}`}
              </Typography>
              <Typography variant="body2">
                {`Recurrence: ${tour.recurrence}`}
                <br />
                {`Days: ${tour.daysOfWeek.join(', ')}`}
              </Typography>
            </CardContent>
            <CardActions className='cardButton'>
              <Link href={`/tourdetails/${tour._id}`} style={{ display: "contents" }}>
                <Button className='submitButton' size="small">
                    More Details...
                </Button>
            </Link>
            </CardActions>
            </React.Fragment>
        </Card>
    )
} 
