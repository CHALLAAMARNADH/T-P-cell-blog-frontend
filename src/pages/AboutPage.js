import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AboutPage() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          About T&P Cell Blog
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to the T&P Cell Blog, where students can share their experiences, insights, and knowledge related to training, placements, and various activities organized by the Training and Placement Cell.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Our platform aims to foster a collaborative environment where students can learn from each other's experiences, explore job opportunities, and stay updated on the latest trends in the industry.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          To get started, sign up for an account and start sharing your T&P experiences. You can also search for posts by other students using their usernames or keywords.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleExpandClick}>
          {expanded ? 'Show Less' : 'Learn More'}
        </Button>
      </CardActions>
      {expanded && (
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Additional features:
            <ul>
              <li>Search functionality to find posts by username or keywords</li>
              <li>Customizable user profiles</li>
            </ul>
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
