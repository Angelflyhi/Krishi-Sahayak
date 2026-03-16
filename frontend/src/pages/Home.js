import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';

export default function Home({ crops, mandiRates }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
          Crop Library
        </Typography>
      </Grid>
      {crops.slice(0, 3).map((crop) => (
        <Grid item xs={12} sm={6} key={crop._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{crop.name}</Typography>
              <Chip label={crop.seasonality} color="success" sx={{ mt: 1 }} />
              <Typography sx={{ mt: 1 }}>Soil: {crop.soil_type}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
          Latest Mandi Prices
        </Typography>
      </Grid>
      {mandiRates.slice(0, 3).map((rate) => (
        <Grid item xs={12} key={rate._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{rate.crop_id?.name || 'Crop'}</Typography>
              <Typography>
                {rate.district}: ₹{rate.price} / क्विंटल
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
