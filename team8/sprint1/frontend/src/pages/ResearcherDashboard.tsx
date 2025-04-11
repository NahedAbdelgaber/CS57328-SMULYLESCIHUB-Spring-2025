import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Button
} from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import authService from '../services/auth.service';
import researcherService from '../services/researcher.service';
import {
  ResearcherProfile,
  WordCloudData,
  TopicPieChartData,
  KeywordBarChartData,
  TopicTrendData
} from '../types.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const ResearcherDashboard: React.FC = () => {
  const [profile, setProfile] = useState<ResearcherProfile | null>(null);
  const [wordCloudData, setWordCloudData] = useState<WordCloudData | null>(null);
  const [topicPieChartData, setTopicPieChartData] = useState<TopicPieChartData | null>(null);
  const [keywordBarChartData, setKeywordBarChartData] = useState<KeywordBarChartData | null>(null);
  const [topicTrendData, setTopicTrendData] = useState<TopicTrendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const profileResponse = await researcherService.getResearcherProfile();
        setProfile(profileResponse.data);

        const researcherId = profileResponse.data.id;

        const wordCloud = await researcherService.getWordCloudData(researcherId);
        setWordCloudData(wordCloud);

        const topicPieChart = await researcherService.getTopicPieChartData(researcherId);
        setTopicPieChartData(topicPieChart);

        const keywordBarChart = await researcherService.getKeywordBarChartData(researcherId);
        setKeywordBarChartData(keywordBarChart);

        const topicTrend = await researcherService.getTopicTrendData(researcherId);
        setTopicTrendData(topicTrend);

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const pieChartData = topicPieChartData ? {
    labels: topicPieChartData.labels,
    datasets: [
      {
        data: topicPieChartData.data,
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

  const barChartData = keywordBarChartData ? {
    labels: keywordBarChartData.labels,
    datasets: [
      {
        label: 'Keyword Frequency',
        data: keywordBarChartData.data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  } : null;

  const lineChartData = topicTrendData ? {
    labels: topicTrendData.labels,
    datasets: topicTrendData.datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ][index % 5],
      backgroundColor: 'rgba(255, 255, 255, 0)',
      tension: 0.1,
    })),
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
        <Typography variant="h4" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Researcher Dashboard
      </Typography>

      {profile && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {profile.fullName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Department: {profile.department}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Position: {profile.position}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {profile.bio}
          </Typography>
        </Paper>
      )}

      <Grid container spacing={4}>
        {/* Keyword List instead of Word Cloud */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Research Keywords
            </Typography>
            {wordCloudData && wordCloudData.words.length > 0 ? (
              <Box sx={{
                height: '320px',
                overflowY: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                p: 1
              }}>
                {wordCloudData.words.map((word, idx) => {
                  const size = Math.min(40, 14 + word.value * 2); // simple scale
                  return (
                    <Typography
                      key={idx}
                      sx={{ fontSize: `${size}px`, fontWeight: 500 }}
                      color="primary"
                    >
                      {word.text}
                    </Typography>
                  );
                })}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '320px' }}>
                <Typography variant="body1" color="textSecondary">
                  No keyword data available. Upload documents to generate keywords.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Topic Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Topic Distribution
            </Typography>
            {pieChartData && pieChartData.labels.length > 0 ? (
              <Box sx={{ height: '320px', display: 'flex', justifyContent: 'center' }}>
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '320px' }}>
                <Typography variant="body1" color="textSecondary">
                  No topic data available. Upload documents to generate topics.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Keyword Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Top Keywords
            </Typography>
            {barChartData && barChartData.labels.length > 0 ? (
              <Box sx={{ height: '320px' }}>
                <Bar
                  data={barChartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '320px' }}>
                <Typography variant="body1" color="textSecondary">
                  No keyword frequency data available. Upload documents to generate data.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Topic Trend Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Topic Trends Over Time
            </Typography>
            {lineChartData && lineChartData.labels.length > 0 ? (
              <Box sx={{ height: '320px' }}>
                <Line
                  data={lineChartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '320px' }}>
                <Typography variant="body1" color="textSecondary">
                  No trend data available. Upload documents to generate trends.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResearcherDashboard;
