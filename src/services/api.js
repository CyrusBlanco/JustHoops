//API Service with MongoDB Backend Integration
 
 

// Use environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL;

class HoopsAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Generic request wrapper with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get token from localStorage
    const token = localStorage.getItem('hoops_token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // Add token if exists
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Extract data from the response
      // Backend returns: { success: true, data: [...], message: "..." }
      return result.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ========== COURTS API ==========
  
  async getCourts() {
    return this.request('/api/courts');
  }

  async getCourtById(id) {
    return this.request(`/api/courts/${id}`);
  }

  async createCourt(courtData) {
    return this.request('/api/courts', {
      method: 'POST',
      body: JSON.stringify(courtData),
    });
  }

  async updateCourt(id, courtData) {
    return this.request(`/api/courts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courtData),
    });
  }

  async deleteCourt(id) {
    return this.request(`/api/courts/${id}`, {
      method: 'DELETE',
    });
  }

  // ========== GAMES API ==========
  
  async getGames(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/api/games${queryParams ? '?' + queryParams : ''}`);
  }

  async getGameById(id) {
    return this.request(`/api/games/${id}`);
  }

  async createGame(gameData) {
    return this.request('/api/games', {
      method: 'POST',
      body: JSON.stringify(gameData),
    });
  }

  async updateGame(id, gameData) {
    return this.request(`/api/games/${id}`, {
      method: 'PUT',
      body: JSON.stringify(gameData),
    });
  }

  async deleteGame(id) {
    return this.request(`/api/games/${id}`, {
      method: 'DELETE',
    });
  }

  async getLiveGames() {
    return this.request('/api/games/live');
  }

  // ========== PLAYERS API ==========
  
  async getPlayers(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/api/players${queryParams ? '?' + queryParams : ''}`);
  }

  async getPlayerById(id) {
    return this.request(`/api/players/${id}`);
  }

  async createPlayer(playerData) {
    return this.request('/api/players', {
      method: 'POST',
      body: JSON.stringify(playerData),
    });
  }

  async updatePlayer(id, playerData) {
    return this.request(`/api/players/${id}`, {
      method: 'PUT',
      body: JSON.stringify(playerData),
    });
  }

  async deletePlayer(id) {
    return this.request(`/api/players/${id}`, {
      method: 'DELETE',
    });
  }

  // ========== STATISTICS API ==========
  
  async getStats() {
    return this.request('/api/stats');
  }
}

// Create and export a single instance
const api = new HoopsAPI();
export default api;

// Also export the class if needed
export { HoopsAPI };