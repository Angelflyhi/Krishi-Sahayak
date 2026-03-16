import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';

export default function CropsPage({ crops, filters, setFilters }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="medium"
          label="Search crop"
          value={filters.search}
          onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
        />
      </Grid>
      {crops.map((crop) => (
        <Grid item xs={12} key={crop._id}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {crop.name}
              </Typography>
              <Typography>Season: {crop.seasonality}</Typography>
              <Typography>Soil: {crop.soil_type}</Typography>
              <Typography>Irrigation: {crop.irrigation_needs}</Typography>
              <Typography>Fertilizers: {crop.fertilizers?.join(', ')}</Typography>
              <Typography>
                Pests: {crop.pests?.map((p) => `${p.name} (${p.treatment})`).join(', ') || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
