"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from './tourcreation.css'

const TourForm = ({ tour }) => {
  const router = useRouter();
  const startingTourData = {
    title: "",
    startDate: null,
    endDate: null,
    recurrence: "",
    daysOfWeek: [],
  };

  const [tourData, setTourData] = useState(startingTourData);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const res = await fetch("/api/tourcreate", {
        method: "POST",
        body: JSON.stringify({ tourData }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create tour");
    }

    router.refresh();
    router.push("/tourlisting");
  };
  
  const handleDayChange = (event) => {
    setTourData({
      ...tourData,
      daysOfWeek: event.target.checked
        ? [...tourData.daysOfWeek, event.target.name]
        : tourData.daysOfWeek.filter(day => day !== event.target.name),
    });
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="formContainer"
      >
        <h1 className="heading">Create New Tour</h1>
        <TextField
          className='inputField'
          required
          label="Title"
          value={tourData.title}
          onChange={(e) => setTourData({ ...tourData, title: e.target.value })}
          id="title"
        />
        <DatePicker
          className='datePicker'
          required
          label="Start Date"
          value={tourData.startDate}
          onChange={(newValue) => setTourData({ ...tourData, startDate: newValue })}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          id="startDate"
        />
        <DatePicker
          className='datePicker'
          required
          label="End Date"
          value={tourData.endDate}
          onChange={(newValue) => setTourData({ ...tourData, endDate: newValue })}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          id="endDate"
        />
        <FormControl fullWidth margin="normal" className='recurrence'>
          <InputLabel>Recurrence</InputLabel>
          <Select
            value={tourData.recurrence}
            label="Recurrence"
            required
            onChange={(e) => setTourData({ ...tourData, recurrence: e.target.value })}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        {tourData.recurrence === 'Weekly' && (
          <FormGroup>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <FormControlLabel
                control={<Checkbox checked={tourData.daysOfWeek.includes(day)} onChange={handleDayChange} name={day} />}
                label={day}
                key={day}
              />
            ))}
          </FormGroup>
        )}
        <Button className='submitButton' type="submit" variant="contained" color='success'>
            Create Tour</Button>
      </form>
    </LocalizationProvider>
    </div>
  );
};

export default TourForm;
