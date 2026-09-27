import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityDetail } from "../services/api";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
        <Typography color="text.secondary">
          Loading activity...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 4,
      }}
    >
      {/* Activity Summary */}
      <Card
        sx={{
          mb: 3,
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 1 }}
          >
            Activity Summary
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <Typography variant="h4" fontWeight={800}>
              {activity.type}
            </Typography>

            <Chip
              label="Completed"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f7f8fa",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Duration
              </Typography>

              <Typography variant="h6" fontWeight={700}>
                {activity.duration} min
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#f7f8fa",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Calories Burned
              </Typography>

              <Typography variant="h6" fontWeight={700}>
                {activity.caloriesBurned} kcal
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#f7f8fa",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Recorded
              </Typography>

              <Typography variant="body1" fontWeight={600}>
                {new Date(activity.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {recommendation && (
        <Card
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: 1 }}
            >
              FitPulse AI
            </Typography>

            <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
              Personalized Fitness Insights
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              AI-generated analysis based on your recorded activity.
            </Typography>

            {/* Analysis */}
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Analysis
            </Typography>

            <Typography
              paragraph
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              {activity.recommendation}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Improvements */}
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Areas for Improvement
            </Typography>

            {activity?.improvements?.length > 0 ? (
              <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                {activity.improvements.map((improvement, index) => (
                  <Typography
                    component="li"
                    key={index}
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {improvement}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                No improvement points were provided.
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Suggestions */}
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Suggestions
            </Typography>

            {activity?.suggestions?.length > 0 ? (
              <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                {activity.suggestions.map((suggestion, index) => (
                  <Typography
                    component="li"
                    key={index}
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {suggestion}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                No suggestions were provided.
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Safety */}
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Safety Guidelines
            </Typography>

            {activity?.safety?.length > 0 ? (
              <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                {activity.safety.map((safety, index) => (
                  <Typography
                    component="li"
                    key={index}
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {safety}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                No safety guidelines were provided.
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetail;