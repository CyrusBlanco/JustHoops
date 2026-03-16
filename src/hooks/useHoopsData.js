import { useState, useEffect } from 'react';
import api from '../services/api';
import { mockCourts, mockGames } from '../utils/mockData';

/**
 * Custom hook for fetching and managing Hoops data
 * Automatically falls back to mock data if API fails
 */
const useHoopsData = () => {
  const [courts, setCourts] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API
      const courtsData = await api.getCourts();
      const gamesData = await api.getGames();
      
      // API returns { success: true, data: [...] }
      // Extract the data array from the response
      setCourts(courtsData.data || []);
      setGames(gamesData.data || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
      // Fallback to mock data if API fails
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    setCourts(mockCourts);
    setGames(mockGames);
  };

  const refetch = () => {
    loadData();
  };

  return {
    courts,
    games,
    loading,
    error,
    refetch,
  };
};

export default useHoopsData;