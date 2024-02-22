"use client"
import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Container } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Link from "next/link";
import styles from '../../tourcreation/tourcreation.css'
import dayjs from 'dayjs';

const getTourById = (id) => {
  return fetch(`http://localhost:3000/api/tourcreate/${id}`, {
            cache: "no-store",
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch tour");
    }
    return response.json();
  })
  .catch(error => {
    console.log(error);
  });
};
// const getTourById = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/tourcreate/${id}`, {
//         cache: "no-store",
//       });
  
//       if (!res.ok) {
//         throw new Error("Failed to fetch topic");
//       }
  
//       return res.json();
//     } catch (error) {
//       console.log(error);
//     }
//   };

export default async function BookTourPage({params}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState('');

const data = await getTourById(params.id);
  if (!data.foundTour) {
    return <p>No tours.</p>;
  }

  const tours = data.foundTour;
    const validateDate = (date) => {
      // Check if tours data is available
      if (!tours || !tours.recurrence) return false; // No tour data available or recurrence not set, consider it as an invalid date
    
      // Extract day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
      const dayOfWeek = date.getDay();
    
      // Check if the tour has a recurrence set to 'Weekly'
      if (tours.recurrence === 'Weekly' && tours.daysOfWeek && tours.daysOfWeek.length > 0) {
        // Convert tour days to numbers: 'Sunday' -> 0, 'Monday' -> 1, ..., 'Saturday' -> 6
        const tourDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => day.toUpperCase());
        
        // Check if the day of the week is included in the tour days
        return tourDays.includes(dayOfWeek);
      }
    
      // For 'Daily' recurrence or if daysOfWeek is not provided, all days are valid
      // return true;
    };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>Book Tour</Typography>
        <form>
          <DatePicker
            label="Select Date"
            value={dayjs(selectedDate)}
            onChange={setSelectedDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
            // shouldDisableDate={validateDate}
          />
          <Button className='submitButton' type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Submit Booking
          </Button>
        </form>
      </Container>
    </LocalizationProvider>
  );
  }
