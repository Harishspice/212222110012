import { useEffect, useState } from 'react';
import { getUrlData } from '../utils/storage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function StatsTable() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    setUrls(getUrlData());
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Short URL</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Expires</TableCell>
          <TableCell>Clicks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {urls.map((u, i) => (
          <TableRow key={i}>
            <TableCell>
              <a href={`/${u.shortCode}`} target="_blank" rel="noreferrer">
                {u.shortCode}
              </a>
            </TableCell>
            <TableCell>{u.createdAt}</TableCell>
            <TableCell>{u.expiresAt}</TableCell>
            <TableCell>
              {u.clicks.length}
              {u.clicks.length > 0 && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    View Click Details
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                      {u.clicks.map((c, j) => (
                        <li key={j}>
                          {c.timestamp} | {c.referrer || 'N/A'} | {c.location}
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
