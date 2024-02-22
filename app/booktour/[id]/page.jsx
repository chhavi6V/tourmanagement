"use client";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import styles from '../../tourcreation/tourcreation.css'

export default function BookTourPage({ params }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tourData, setTourData] = useState(null);

  useEffect(() => {
    const getTourById = async (id) => {
      try {
        const res = await fetch(`http://localhost:3000/api/tourcreate/${id}`, {
          cache: "no-store",
        });
    
        if (!res.ok) {
          throw new Error("Failed to fetch tour");
        }
    
        return res.json();
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    getTourById(params.id).then(data => {
      if (data && data.foundTour) {
        setTourData(data.foundTour);
      }
    });
  }, [params.id]);

  if (!tourData) {
    return <p>No tours found.</p>;
  }

  const validateDate = (date) => {
    if (!tourData.recurrence) return false;

    const dayOfWeek = date.day();
    if (tourData.recurrence === 'Weekly' && tourData.daysOfWeek && tourData.daysOfWeek.length > 0) {
      const validDays = tourData.daysOfWeek.map((day) => {
        switch (day) {
          case 'Sunday': return 0;
          case 'Monday': return 1;
          case 'Tuesday': return 2;
          case 'Wednesday': return 3;
          case 'Thursday': return 4;
          case 'Friday': return 5;
          case 'Saturday': return 6;
          default: return -1;
        }
      });

      return !validDays.includes(dayOfWeek);
    }

    return true;
  };

  const handleSubmit = async (e) => {
    alert('Booking Submitted...')
    e.preventDefault();
    
    const payload = {
      username: tourData.user, 
      selectedDate: selectedDate.toISOString(), 
    };
  
    try {
      const res = await fetch("/api/booktour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" component="h1" className='heading'>Book Tour</Typography>
        <form className='formContainer' onSubmit={handleSubmit}>
          <TextField
            className='usernameInput'
            required
            label="User Name"
            value={tourData.user}
            onChange={(e) => setTourData({ ...tourData, user: e.target.value })}
            id="title"
          />
          <DatePicker
            label="Select Date"
            value={dayjs(selectedDate)}
            onChange={(newValue) => {
              setSelectedDate(newValue ? newValue.toDate() : new Date());
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
            shouldDisableDate={(date) => !validateDate(dayjs(date))}
          />
          <Button 
            onClick={handleSubmit}
            className='submitButton' 
            type="button" 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '20px' }}
            >
            Submit Booking
          </Button>
        </form>
      </Container>
    </LocalizationProvider>
  );
}
