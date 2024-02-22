"use client"
import React from 'react';
import { Button, Typography, Paper, Container } from '@mui/material';
import styles from '../../tourcreation/tourcreation.css'
import Link from "next/link";

const getTourById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tourcreate/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function TourDetailsPage({params}) {
  
  const data = await getTourById(params.id);
    if (!data.foundTour) {
      return <p>No tours.</p>;
    }
  
    const tours = data.foundTour;

  // if (!tours) return <Typography variant="h5" component="h2">Loading...</Typography>;

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {tours.title}
        </Typography>
        <Typography variant="body1" paragraph>
          Date: {new Date(tours.startDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" paragraph>
          {tours.endDate}
        </Typography>
        <Link href={`/booktour/${params.id}`} style={{ display: "contents" }}>
        <Button className='submitButton' variant="contained" color="primary" onClick={() => alert('Booking tour...')}>
          Book Tour
        </Button>
        </Link>
      </Paper>
    </Container>
  );
}
