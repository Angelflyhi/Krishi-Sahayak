import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CropsPage from './pages/CropsPage';
import CommunityPage from './pages/CommunityPage';
import { createPost, getCrops, getMandiRates, getPosts } from './api/cropsApi';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [tab, setTab] = useState(0);
  const [crops, setCrops] = useState([]);
  const [mandiRates, setMandiRates] = useState([]);
  const [posts, setPosts] = useState([]);
  const [question, setQuestion] = useState('');
  const [filters, setFilters] = useState({ search: '' });
  const { t } = useLanguage();

  useEffect(() => {
    getMandiRates().then(setMandiRates).catch(() => setMandiRates([]));
    getPosts().then(setPosts).catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    getCrops({ search: filters.search }).then(setCrops).catch(() => setCrops([]));
  }, [filters.search]);

  const tabs = useMemo(() => [t.home, t.crops, t.community], [t]);

  const handleSubmitQuestion = async () => {
    if (!question.trim()) return;
    const token = localStorage.getItem('ks_token');
    if (!token) {
      alert('Login token not found. Save token in localStorage as ks_token to post.');
      return;
    }

    const newPost = await createPost({ content: question }, token);
    setPosts((prev) => [newPost, ...prev]);
    setQuestion('');
  };

  return (
    <Box sx={{ bgcolor: '#f6fff6', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pt: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="fullWidth"
          textColor="inherit"
          indicatorColor="primary"
        >
          {tabs.map((item) => (
            <Tab key={item} label={item} sx={{ fontSize: '1rem', fontWeight: 700 }} />
          ))}
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tab === 0 && <Home crops={crops} mandiRates={mandiRates} />}
          {tab === 1 && <CropsPage crops={crops} filters={filters} setFilters={setFilters} />}
          {tab === 2 && (
            <CommunityPage
              posts={posts}
              question={question}
              setQuestion={setQuestion}
              onSubmit={handleSubmitQuestion}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}
