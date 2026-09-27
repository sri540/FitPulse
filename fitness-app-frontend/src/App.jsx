import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Your Fitness Activity
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Track your workouts and get personalized insights from FitPulse.
        </Typography>
      </Box>

      <ActivityForm onActivitiesAdded={() => window.location.reload()} />

      <Box sx={{ mt: 4 }}>
        <ActivityList />
      </Box>
    </Container>
  );
};

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            background:
              "linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 520,
              textAlign: "center",
              backgroundColor: "white",
              borderRadius: 4,
              p: { xs: 4, sm: 6 },
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{ mb: 1 }}
            >
              FitPulse
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              AI-powered fitness tracking
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Track your activities, understand your performance,
              and receive personalized fitness insights.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={logIn}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Continue to FitPulse
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              backgroundColor: "#ffffff",
              color: "#1f2937",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ letterSpacing: "-0.5px" }}
              >
                FitPulse
              </Typography>

              <Button
                variant="outlined"
                onClick={logOut}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>

          <Box
            sx={{
              minHeight: "calc(100vh - 64px)",
              backgroundColor: "#f7f8fa",
            }}
          >
            <Routes>
              <Route
                path="/activities"
                element={<ActivitiesPage />}
              />

              <Route
                path="/activities/:id"
                element={<ActivityDetail />}
              />

              <Route
                path="/"
                element={
                  token ? (
                    <Navigate to="/activities" replace />
                  ) : (
                    <div>Welcome! Please Login.</div>
                  )
                }
              />
            </Routes>
          </Box>
        </>
      )}
    </Router>
  );
}

export default App;