import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper
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
  const [profile, setProfile] = useState<any>({
    fullName: 'Dr. Jane Doe',
    department: 'Computer Science',
    position: 'Associate Professor',
    bio: 'Specializes in NLP, Deep Learning, and Educational Technology.'
  });

  const [wordCloudData, setWordCloudData] = useState<any>({
    words: [
      { text: 'NLP', value: 10 },
      { text: 'Deep Learning', value: 8 },
      { text: 'BERT', value: 7 },
      { text: 'Transformers', value: 6 },
      { text: 'Citation', value: 5 },
      { text: 'Recommendation', value: 5 },
      { text: 'Summarization', value: 4 },
      { text: 'Graph Neural Networks', value: 3 },
      { text: 'Temporal Graphs', value: 3 },
      { text: 'Topic Modeling', value: 2 },
    ]
  });

  const [topicPieChartData, setTopicPieChartData] = useState<any>({
    labels: ['NLP', 'AI Ethics', 'Education', 'Vision'],
    data: [45, 25, 15, 15]
  });

  const [keywordBarChartData, setKeywordBarChartData] = useState<any>({
    labels: ['NLP', 'BERT', 'Graph', 'Summarization', 'Topic Modeling'],
    data: [20, 18, 14, 12, 10]
  });

  const [topicTrendData, setTopicTrendData] = useState<any>({
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'NLP',
        data: [10, 14, 20, 25, 30]
      },
      {
        label: 'Education',
        data: [5, 7, 8, 12, 14]
      }
    ]
  });

  const pieChartData = topicPieChartData?.labels?.length ? {
    labels: topicPieChartData.labels,
    datasets: [{
      data: topicPieChartData.data,
      backgroundColor: [
        '#ff6384',
        '#36a2eb',
        '#ffcd56',
        '#4bc0c0'
      ],
      borderWidth: 1
    }]
  } : null;

  const barChartData = keywordBarChartData?.labels?.length ? {
    labels: keywordBarChartData.labels,
    datasets: [{
      label: 'Keyword Frequency',
      data: keywordBarChartData.data,
      backgroundColor: '#36a2eb'
    }]
  } : null;

  const lineChartData = topicTrendData?.datasets?.length ? {
    labels: topicTrendData.labels,
    datasets: topicTrendData.datasets.map((dataset: any, index: number) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: ['#ff6384', '#36a2eb'][index % 2],
      tension: 0.3,
      fill: false
    }))
  } : null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Researcher Dashboard
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5">{profile.fullName}</Typography>
        <Typography>Department: {profile.department}</Typography>
        <Typography>Position: {profile.position}</Typography>
        <Typography sx={{ mt: 1 }}>{profile.bio}</Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Keyword List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6">Research Keywords</Typography>
            <Box sx={{
              height: '320px',
              overflowY: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              p: 1
            }}>
              {wordCloudData?.words?.map((word: any, idx: number) => {
                const size = Math.min(40, 14 + word.value * 2);
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
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6">Topic Distribution</Typography>
            <Box sx={{ height: '320px', display: 'flex', justifyContent: 'center' }}>
              {pieChartData ? (
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              ) : (
                <Typography>No topic data available</Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6">Top Keywords</Typography>
            <Box sx={{ height: '320px' }}>
              {barChartData ? (
                <Bar data={barChartData} options={{
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } }
                }} />
              ) : (
                <Typography>No keyword data available</Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6">Topic Trends Over Time</Typography>
            <Box sx={{ height: '320px' }}>
              {lineChartData ? (
                <Line data={lineChartData} options={{
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } }
                }} />
              ) : (
                <Typography>No trend data available</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResearcherDashboard;
