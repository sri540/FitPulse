import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivitiesAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addActivity(activity);

      if (onActivitiesAdded) {
        onActivitiesAdded();
      }

      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        additionalMetrics: {},
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        p: { xs: 2.5, sm: 3 },
        boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
        Log a new activity
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Record your workout and keep your fitness history up to date.
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Activity Type</InputLabel>

        <Select
          value={activity.type}
          label="Activity Type"
          onChange={(e) =>
            setActivity({
              ...activity,
              type: e.target.value,
            })
          }
        >
          <MenuItem value="RUNNING">Running</MenuItem>
          <MenuItem value="WALKING">Walking</MenuItem>
          <MenuItem value="CYCLING">Cycling</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
          },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          required
          label="Duration"
          placeholder="e.g. 30"
          type="number"
          helperText="Minutes"
          value={activity.duration}
          onChange={(e) =>
            setActivity({
              ...activity,
              duration: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          required
          label="Calories Burned"
          placeholder="e.g. 250"
          type="number"
          helperText="Estimated calories"
          value={activity.caloriesBurned}
          onChange={(e) =>
            setActivity({
              ...activity,
              caloriesBurned: e.target.value,
            })
          }
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.3,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Add Activity
      </Button>
    </Box>
  );
};

export default ActivityForm;