import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import { nanoid } from "nanoid";
import { log } from "../../../LoggingMiddleware/log.js";
import LinkIcon from "@mui/icons-material/Link";
import TimerIcon from "@mui/icons-material/Timer";
import CodeIcon from "@mui/icons-material/Code";

export default function ShortenerPage() {
  const [records, setRecords] = useState([]);
  const [inputs, setInputs] = useState(
    Array.from({ length: 3 }, () => ({ url: "", validity: "", code: "" }))
  );

  const handleChange = (index, field, value) => {
    setInputs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    const newRecords = [];

    inputs.forEach(({ url, validity, code }, i) => {
      if (!url) return;

      if (!validateUrl(url)) {
        log("error", "api", `Invalid URL at row ${i + 1}`);
        return;
      }

      const minutes = validity ? parseInt(validity, 10) : 30;
      if (isNaN(minutes) || minutes <= 0) {
        log("error", "api", `Invalid validity at row ${i + 1}`);
        return;
      }

      const shortcode = code || nanoid(6);
      const expiry = new Date(Date.now() + minutes * 60 * 1000);

      newRecords.push({ id: shortcode, original: url, shortcode, expiry });
      log("info", "api", `Short URL created: ${shortcode}`);
    });

    setRecords((prev) => [...prev, ...newRecords]);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          🚀 Quick URL Shortener
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Enter your URLs below to generate short links with optional expiry time and custom codes.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          {inputs.map((row, idx) => (
            <Paper key={idx} elevation={2} sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <TextField
                    label="🔗 Original URL"
                    placeholder="https://example.com"
                    fullWidth
                    value={row.url}
                    onChange={(e) => handleChange(idx, "url", e.target.value)}
                    InputProps={{
                      startAdornment: <LinkIcon sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    label="⏳ Validity (min)"
                    type="number"
                    fullWidth
                    value={row.validity}
                    onChange={(e) => handleChange(idx, "validity", e.target.value)}
                    InputProps={{
                      startAdornment: <TimerIcon sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    label="💡 Custom Code (optional)"
                    fullWidth
                    value={row.code}
                    onChange={(e) => handleChange(idx, "code", e.target.value)}
                    InputProps={{
                      startAdornment: <CodeIcon sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>

        <Box textAlign="right" sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} size="large">
            ➕ Generate Links
          </Button>
        </Box>
      </Paper>

      {records.length > 0 && (
        <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            📋 Your Shortened URLs
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1}>
            {records.map((rec) => (
              <Box key={rec.id} sx={{ backgroundColor: "#e8f5e9", p: 2, borderRadius: 1 }}>
                <Typography variant="body1">
                  <strong>{window.location.origin}/{rec.shortcode}</strong> → {rec.original}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ⏰ Expires at: {rec.expiry.toLocaleTimeString()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
