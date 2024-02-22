"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { Typography, Grid} from '@mui/material';
import TourCard from '../(components)/TourCard'
import styles from '../tourcreation/tourcreation.css'

const getTours = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tourcreate", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };


export default async function TourListingPage() {
    const router = useRouter();
      const data = await getTours();

      if (!data?.tours) {
        return <p>No tours.</p>;
      }
    
      const tours = data.tours;

  return (
    <div>
    <Typography variant="h1" className='heading'>Available Tours</Typography>
    <div className='listdiv'>
      <Grid container spacing={2}>
        {tours.map((tour,_index) => (
          <Grid key={_index}
            item xs={5}>
            <TourCard 
              id={_index}
              tour={tour}
            />
          </Grid>
        ))}
        </Grid>
    </div>
    </div>
  );
}