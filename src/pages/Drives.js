import React from "react";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from "@mui/material";

const upcomingCompanies = [
  
    { name: "Google", date: "Sep 25, 2024", position: "Software Engineer" },
    { name: "Microsoft", date: "Sep 30, 2024", position: "Cloud Engineer" },
    { name: "Amazon", date: "Oct 5, 2024", position: "Data Scientist" },
    { name: "Apple", date: "Oct 10, 2024", position: "iOS Developer" },
    { name: "Facebook", date: "Oct 15, 2024", position: "Full-Stack Developer" },
    { name: "Adobe", date: "Oct 20, 2024", position: "UI/UX Designer" },
    { name: "Intel", date: "Oct 25, 2024", position: "Hardware Engineer" },
    { name: "Tesla", date: "Oct 30, 2024", position: "Automation Engineer" },
    { name: "IBM", date: "Nov 5, 2024", position: "Blockchain Developer" },
    { name: "Netflix", date: "Nov 10, 2024", position: "DevOps Engineer" },
    { name: "Uber", date: "Nov 15, 2024", position: "Mobile App Developer" },
    { name: "Salesforce", date: "Nov 20, 2024", position: "Business Analyst" },
    { name: "Goldman Sachs", date: "Nov 25, 2024", position: "Quantitative Analyst" },
    { name: "Spotify", date: "Nov 30, 2024", position: "Machine Learning Engineer" },
  
  
];

const Drives = () => {
  return (
    <Card sx={{ margin: "20px", padding: "20px", backgroundColor: "#f5f5f5" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          📢 Flash News: Upcoming Companies for Placement
        </Typography>
        <List>
          {upcomingCompanies.map((company, index) => (
            <Box key={index}>
              <ListItem>
                <ListItemText
                  primary={company.name}
                  secondary={`${company.position} - ${company.date}`}
                />
              </ListItem>
              {index < upcomingCompanies.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Drives;
