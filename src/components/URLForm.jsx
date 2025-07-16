import { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { generateShortcode, isValidUrl, isAlphaNumeric } from '../utils/helpers';
import { saveUrlData } from '../utils/storage';
import { logEvent } from '../middleware/logger';

export default function URLForm() {
  const [urls, setUrls] = useState(
    Array(5).fill({ url: '', validity: '', shortcode: '' })
  );
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const handleSubmit = () => {
    const newResults = [];

    urls.forEach((item, i) => {
      const { url, validity, shortcode } = item;
      if (!url || !isValidUrl(url)) {
        logEvent('error', 'Invalid URL', { index: i, url });
        return;
      }

      const code =
        shortcode && isAlphaNumeric(shortcode)
          ? shortcode
          : generateShortcode();

      const validMins = validity ? parseInt(validity) : 30;
      const createdAt = new Date().toISOString();
      const expiresAt = new Date(Date.now() + validMins * 60000).toISOString();

      const newEntry = {
        originalURL: url,
        shortCode: code,
        validity: validMins,
        createdAt,
        expiresAt,
        clicks: [],
      };

      saveUrlData(newEntry);
      logEvent('success', 'Short URL created', newEntry);
      newResults.push(newEntry);
    });

    setResults(newResults);
  };

  return (
    <>
      {urls.map((row, i) => (
        <Paper key={i} sx={{ p: 2, my: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Original URL"
                fullWidth
                value={row.url}
                onChange={(e) => handleChange(i, 'url', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Validity (min)"
                fullWidth
                value={row.validity}
                onChange={(e) => handleChange(i, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={row.shortcode}
                onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="contained" onClick={handleSubmit}>
        Shorten URLs
      </Button>

      {results.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Shortened Links</h2>
          {results.map((r, i) => (
            <p key={i}>
              {r.originalURL} →{' '}
              <a href={`/${r.shortCode}`} target="_blank" rel="noreferrer">
                localhost:3000/{r.shortCode}
              </a>{' '}
              (expires at: {r.expiresAt})
            </p>
          ))}
        </div>
      )}
    </>
  );
}
