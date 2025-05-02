import React, { useEffect, useState } from 'react';
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
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import Grid from '@mui/material/Grid';
import { AdminAnalyticsData, TopicEntry, ResearcherSummary } from '../types';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState('');

  useEffect(() => {
    // Simulated multi-researcher analytics
    const mockAnalytics: AdminAnalyticsData = {
      departments: {
        'Computer Science': 2,
        'Biology': 1,
        'Mathematics': 1
      },
      topTopics: [
        { topic: 'Deep Learning', count: 14 },
        { topic: 'Bioinformatics', count: 11 },
        { topic: 'Graph Theory', count: 9 },
        { topic: 'Transformers', count: 7 },
        { topic: 'Algebra', count: 5 },
      ],
      researcherSummaries: [
        {
          name: 'Dr. Jane Doe',
          department: 'Computer Science',
          topTopic: 'Deep Learning',
          totalPapers: 12
        },
        {
          name: 'Dr. Alan Smith',
          department: 'Biology',
          topTopic: 'Bioinformatics',
          totalPapers: 9
        },
        {
          name: 'Dr. Lin Mei',
          department: 'Computer Science',
          topTopic: 'Transformers',
          totalPapers: 7
        },
        {
          name: 'Dr. Ravi Kumar',
          department: 'Mathematics',
          topTopic: 'Algebra',
          totalPapers: 6
        }
      ]
    };

    setAnalyticsData(mockAnalytics);
    setLoading(false);
  }, []);

  const departmentChartData = analyticsData ? {
    labels: Object.keys(analyticsData.departments),
    datasets: [{
      data: Object.values(analyticsData.departments),
      backgroundColor: [
        '#ff6384',
        '#36a2eb',
        '#ffcd56',
        '#4bc0c0'
      ],
      borderWidth: 1
    }]
  } : null;

  const topTopicsChartData = analyticsData ? {
    labels: analyticsData.topTopics.map((t: TopicEntry) => t.topic),
    datasets: [{
      label: 'Topic Count',
      data: analyticsData.topTopics.map((t: TopicEntry) => t.count),
      backgroundColor: '#36a2eb'
    }]
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
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6">Department Distribution</Typography>
            {departmentChartData ? (
              <Box sx={{ height: '320px', display: 'flex', justifyContent: 'center' }}>
                <Pie data={departmentChartData} options={{ maintainAspectRatio: false }} />
              </Box>
            ) : (
              <Typography>No department data available.</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6">Top Topics Across Institution</Typography>
            {topTopicsChartData ? (
              <Box sx={{ height: '320px' }}>
                <Bar
                  data={topTopicsChartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } }
                  }}
                />
              </Box>
            ) : (
              <Typography>No topic data available.</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Researcher Summary
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Top Topic</TableCell>
                    <TableCell align="right">Total Papers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {analyticsData?.researcherSummaries?.map((r: ResearcherSummary, index: number) => (
  <TableRow key={index}>
    <TableCell>{index + 1}</TableCell>
    <TableCell>{r.name}</TableCell>
    <TableCell>{r.department}</TableCell>
    <TableCell>{r.topTopic}</TableCell>
    <TableCell align="right">{r.totalPapers}</TableCell>
  </TableRow>
))}

                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
