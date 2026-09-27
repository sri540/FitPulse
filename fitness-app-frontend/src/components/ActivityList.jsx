import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (activities.length === 0) {
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          No activities yet
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Add your first workout above to start building your fitness history.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Recent Activities
      </Typography>

      <Grid container spacing={2}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card
              sx={{
                height: "100%",
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/activities/${activity.id}`)}
                sx={{ height: "100%" }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    sx={{ letterSpacing: 1 }}
                  >
                    Activity
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 2 }}
                  >
                    {activity.type}
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Duration
                      </Typography>

                      <Typography fontWeight={600}>
                        {activity.duration} min
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Calories
                      </Typography>

                      <Typography fontWeight={600}>
                        {activity.caloriesBurned} kcal
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 2, fontWeight: 600 }}
                  >
                    View activity →
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActivityList;