import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import adminService from '../services/admin.service';
import { AdminAnalyticsData } from '../types';
import Grid from '@mui/material/Grid';


// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await adminService.getAnalytics();
        setAnalyticsData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load admin analytics data');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchData();
  }, []);

  // Prepare department chart data
  const departmentChartData = analyticsData ? {
    labels: Object.keys(analyticsData.departments),
    datasets: [
      {
        data: Object.values(analyticsData.departments),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  // Prepare top topics chart data
  const topTopicsChartData = analyticsData ? {
    labels: analyticsData.topTopics.map(t => t.topic),
    datasets: [
      {
        label: 'Topic Count',
        data: analyticsData.topTopics.map(t => t.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  } : null;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={4}>
        {/* Department Distribution */}
        <Grid item={true} xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Department Distribution
            </Typography>
            {departmentChartData ? (
              <Box sx={{ height: '320px', display: 'flex', justifyContent: 'center' }}>
                <Pie data={departmentChartData} options={{ maintainAspectRatio: false }} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '320px' }}>
                <Typography variant="body1" color="textSecondary">
                  No department data available.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Top Topics */}
        <Grid item={true} xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Top Topics Across Institution
            </Typography>
            {topTopicsChartData ? (
              <Box sx={{ height: '320px' }}>
                <Bar 
                  data={topTopicsChartData} 
                  options={{ 
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }} 
                />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '320px' }}>
                <Typography variant="body1" color="textSecondary">
                  No topic data available.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Top Topics Table */}
        <Grid item={true} xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Research Topics
            </Typography>
            {analyticsData && analyticsData.topTopics.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Topic</TableCell>
                      <TableCell align="right">Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analyticsData.topTopics.map((topic, index) => (
                      <TableRow key={topic.topic}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{topic.topic}</TableCell>
                        <TableCell align="right">{topic.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No topic data available.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
