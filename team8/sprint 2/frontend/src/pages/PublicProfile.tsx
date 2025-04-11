import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  CircularProgress,
  Alert
} from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import researcherService from '../services/researcher.service';
import { ResearcherProfile, WordCloudData, TopicPieChartData } from '../types';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const PublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ResearcherProfile | null>(null);
  const [wordCloudData, setWordCloudData] = useState<WordCloudData | null>(null);
  const [topicPieChartData, setTopicPieChartData] = useState<TopicPieChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Get researcher profile
        const profileResponse = await researcherService.getPublicResearcherProfile(parseInt(id));
        setProfile(profileResponse.data);
        
        const researcherId = profileResponse.data.id;
        
        // Get visualization data
        const wordCloud = await researcherService.getWordCloudData(researcherId);
        setWordCloudData(wordCloud);
        
        const topicPieChart = await researcherService.getTopicPieChartData(researcherId);
        setTopicPieChartData(topicPieChart);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load researcher profile');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchData();
  }, [id]);

  // Prepare chart data
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
        Researcher Profile
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
          
          {profile.linkedinUrl && (
            <Typography variant="body2" gutterBottom>
              LinkedIn: <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">{profile.linkedinUrl}</a>
            </Typography>
          )}
          
          {profile.googleScholarUrl && (
            <Typography variant="body2" gutterBottom>
              Google Scholar: <a href={profile.googleScholarUrl} target="_blank" rel="noopener noreferrer">{profile.googleScholarUrl}</a>
            </Typography>
          )}
        </Paper>
      )}
      
      <Typography variant="h5" gutterBottom>
        Research Interests
      </Typography>
      
      <Grid container spacing={4}>
        {/* Keyword List Instead of Word Cloud */}
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
                  No keyword data available.
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
                  No topic data available.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicProfile;
