import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, TextField, IconButton } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

const companiesData = [
  {
    name: 'A',
    establishmentYear: 2000,
    interviewProcess: 'Technical Interview, HR Interview',
    numberOfRounds: 2,
    imageUrl: '/amazon.png',
  },
  {
    name: 'B',
    establishmentYear: 1995,
    interviewProcess: 'Technical Interview, Group Discussion, HR Interview',
    numberOfRounds: 3,
    imageUrl: '/Flipkart.png',
  },
   {
    name: ' C',
    establishmentYear: 2000,
    interviewProcess: 'Technical Interview, HR Interview',
    numberOfRounds: 2,
    imageUrl: '/GOOGLE.webp',
  },
   {
    name: 'D',
    establishmentYear: 2000,
    interviewProcess: 'Technical Interview, HR Interview',
    numberOfRounds: 2,
    imageUrl: '/facebook.png',
  },
   {
    name: 'E',
    establishmentYear: 2000,
    interviewProcess: 'Technical Interview, HR Interview',
    numberOfRounds: 2,
    imageUrl: '/SOTI.png',
  },
   {
    name: 'F',
    establishmentYear: 2000,
    interviewProcess: 'Technical Interview, HR Interview',
    numberOfRounds: 2,
    imageUrl: '/TCS.png',
  },
 
];

const CompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const filteredCompanies = companiesData.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search by Company Name"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2, width: 250 }} 
        InputProps={{
          endAdornment: searchQuery && (
            <IconButton
              aria-label="clear search"
              onClick={handleClearSearch}
              edge="end"
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
      <Grid container spacing={3} justifyContent="center">
        {filteredCompanies.map((company, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                
                image={company.imageUrl}
                alt={company.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Establishment Year:</strong> {company.establishmentYear}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Interview Process:</strong> {company.interviewProcess}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Number of Rounds:</strong> {company.numberOfRounds}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CompaniesPage;
