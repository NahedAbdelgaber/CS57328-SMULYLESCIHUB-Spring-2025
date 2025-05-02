// DocumentUpload.tsx

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import Grid from '@mui/material/Grid'; // Using the normal, stable Grid
import { SelectChangeEvent } from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import researcherService from '../services/researcher.service';
import { Document } from '../types';

const DocumentUpload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('CV');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);

  // Fetch existing documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    setLoadingDocuments(true);
    researcherService.getAllDocuments()
      .then(response => {
        setDocuments(response.data);
        setLoadingDocuments(false);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
        setLoadingDocuments(false);
      });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDocumentTypeChange = (e: SelectChangeEvent) => {
    setDocumentType(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

    if (!title || !documentType || !file) {
      setMessage('Please fill in all fields and select a file');
      return;
    }

    setLoading(true);

    researcherService.uploadDocument(file, title, documentType)
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setMessage('Document uploaded successfully!');
        setTitle('');
        setDocumentType('CV');
        setFile(null);

        // Reset file input
        const fileInput = document.getElementById('document-file') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }

        // Refresh documents list
        fetchDocuments();
      })
      .catch(error => {
        setLoading(false);
        setSuccess(false);
        setMessage(
          (error.response && error.response.data && error.response.data.message) ||
          'Error uploading document. Please try again.'
        );
      });
  };

  const handleDeleteDocument = (id: number) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      researcherService.deleteDocument(id)
        .then(() => {
          setSuccess(true);
          setMessage('Document deleted successfully!');
          fetchDocuments();
        })
        .catch(error => {
          setSuccess(false);
          setMessage(
            (error.response && error.response.data && error.response.data.message) ||
            'Error deleting document. Please try again.'
          );
        });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success.main';
      case 'PROCESSING':
        return 'info.main';
      case 'PENDING':
        return 'warning.main';
      case 'FAILED':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Document Upload
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Upload a New Document
        </Typography>

        <Box component="form" onSubmit={handleUpload} sx={{ mt: 2 }}>
          {message && (
            <Alert severity={success ? 'success' : 'error'} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="document-title"
            label="Document Title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="document-type-label">Document Type</InputLabel>
            <Select
              labelId="document-type-label"
              id="document-type"
              value={documentType}
              label="Document Type"
              onChange={handleDocumentTypeChange}
            >
              <MenuItem value="CV">CV</MenuItem>
              <MenuItem value="PUBLICATION">Publication</MenuItem>
              <MenuItem value="ABSTRACT">Abstract</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 2, mb: 2 }}
          >
            Select File
            <input
              id="document-file"
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
            />
          </Button>

          {file && (
            <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Upload Document'}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Your Documents
        </Typography>

        {loadingDocuments ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : documents.length === 0 ? (
          <Typography variant="body1" color="textSecondary" sx={{ p: 2 }}>
            You haven't uploaded any documents yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {documents.map((doc) => (
              <Grid item xs={12} key={doc.id}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1">
                      {doc.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Type: {doc.documentType} | Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: getStatusColor(doc.processingStatus) }}>
                      Status: {doc.processingStatus}
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => handleDeleteDocument(doc.id)}
                  >
                    Delete
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default DocumentUpload;
