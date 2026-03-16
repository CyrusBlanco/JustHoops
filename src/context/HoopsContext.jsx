import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';



const HoopsContext = createContext();

export const HoopsProvider = ({ children }) => {
  const [courts, setCourts] = useState([]);
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from MongoDB on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all data from your MongoDB API
      const [courtsData, gamesData, playersData] = await Promise.all([
        api.getCourts(),
        api.getGames(),
        api.getPlayers()
      ]);
      
      setCourts(courtsData);
      setGames(gamesData);
      setPlayers(playersData);
    } catch (err) {
      console.error('Error loading data from MongoDB:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========== COURTS FUNCTIONS ==========
  
  const addCourt = async (courtData) => {
    try {
      const newCourt = await api.createCourt(courtData);
      setCourts([...courts, newCourt]);
      return { success: true, data: newCourt };
    } catch (error) {
      console.error('Error adding court:', error);
      return { success: false, error: error.message };
    }
  };

  const updateCourt = async (courtId, courtData) => {
    try {
      const updatedCourt = await api.updateCourt(courtId, courtData);
      setCourts(courts.map(c => c._id === courtId ? updatedCourt : c));
      return { success: true, data: updatedCourt };
    } catch (error) {
      console.error('Error updating court:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteCourt = async (courtId) => {
    try {
      await api.deleteCourt(courtId);
      setCourts(courts.filter(c => c._id !== courtId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting court:', error);
      return { success: false, error: error.message };
    }
  };

  // ========== GAMES FUNCTIONS ==========
  
  const addGame = async (gameData) => {
    try {
      const newGame = await api.createGame(gameData);
      setGames([...games, newGame]);
      return { success: true, data: newGame };
    } catch (error) {
      console.error('Error adding game:', error);
      return { success: false, error: error.message };
    }
  };

  const updateGame = async (gameId, gameData) => {
    try {
      const updatedGame = await api.updateGame(gameId, gameData);
      setGames(games.map(g => g._id === gameId ? updatedGame : g));
      return { success: true, data: updatedGame };
    } catch (error) {
      console.error('Error updating game:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteGame = async (gameId) => {
    try {
      await api.deleteGame(gameId);
      setGames(games.filter(g => g._id !== gameId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting game:', error);
      return { success: false, error: error.message };
    }
  };

  // ========== PLAYERS FUNCTIONS ==========
  
  const addPlayer = async (playerData) => {
    try {
      const newPlayer = await api.createPlayer(playerData);
      setPlayers([...players, newPlayer]);
      return { success: true, data: newPlayer };
    } catch (error) {
      console.error('Error adding player:', error);
      return { success: false, error: error.message };
    }
  };

  const updatePlayer = async (playerId, playerData) => {
    try {
      const updatedPlayer = await api.updatePlayer(playerId, playerData);
      setPlayers(players.map(p => p._id === playerId ? updatedPlayer : p));
      return { success: true, data: updatedPlayer };
    } catch (error) {
      console.error('Error updating player:', error);
      return { success: false, error: error.message };
    }
  };

  const deletePlayer = async (playerId) => {
    try {
      await api.deletePlayer(playerId);
      setPlayers(players.filter(p => p._id !== playerId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting player:', error);
      return { success: false, error: error.message };
    }
  };

  // ========== UTILITY FUNCTIONS ==========
  
  const refetchData = async () => {
    await loadData();
  };

  const value = {
    // Data
    courts,
    games,
    players,
    loading,
    error,
    
    // Court functions
    addCourt,
    updateCourt,
    deleteCourt,
    
    // Game functions
    addGame,
    updateGame,
    deleteGame,
    
    // Player functions
    addPlayer,
    updatePlayer,
    deletePlayer,
    
    // Utility
    refetchData,
  };

  return (
    <HoopsContext.Provider value={value}>
      {children}
    </HoopsContext.Provider>
  );
};

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useHoops = () => {
  const context = useContext(HoopsContext);
  if (!context) {
    throw new Error('useHoops must be used within HoopsProvider');
  }
  return context;
};

export default HoopsContext;