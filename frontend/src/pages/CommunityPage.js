import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

export default function CommunityPage({ posts, question, setQuestion, onSubmit }) {
  const { t } = useLanguage();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t.askQuestion}
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="e.g., White insects on cotton leaves. What should I spray?"
            />
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 2 }}
              onClick={onSubmit}
            >
              {t.submit}
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {posts.map((post) => (
        <Grid item xs={12} key={post._id}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {post.user_id?.username}{' '}
                {post.user_id?.is_expert ? <span aria-label="expert">⭐ Expert</span> : null}
              </Typography>
              <Typography>{post.content}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.created_at).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
