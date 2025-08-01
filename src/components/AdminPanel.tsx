import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, MapPin, Waves, AlertCircle, LogOut, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SurfSpot } from '../types';
import { useAdmin } from '../contexts/AdminContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

interface AdminPanelProps {
  spots: SurfSpot[];
  onSpotsUpdate: () => void;
}

export default function AdminPanel({ spots, onSpotsUpdate }: AdminPanelProps) {
  const { logoutAdmin } = useAdmin();
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingSpot, setEditingSpot] = useState<SurfSpot | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [tableExists, setTableExists] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    waveType: '',
    skillLevel: 'Beginner',
    bestSeason: '',
    tideConditions: '',
    latitude: 0,
    longitude: 0,
    forecastUrl: '',
    imageUrl: ''
  });

  useEffect(() => {
    checkTableExists();
  }, []);

  const checkTableExists = async () => {
    try {
      const { error } = await supabase
        .from('surf_spots')
        .select('count')
        .limit(1);
      
      if (error && (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist'))) {
        setTableExists(false);
      } else {
        setTableExists(true);
      }
    } catch (error) {
      setTableExists(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      waveType: '',
      skillLevel: 'Beginner',
      bestSeason: '',
      tideConditions: '',
      latitude: 0,
      longitude: 0,
      forecastUrl: '',
      imageUrl: ''
    });
  };

  const handleCreate = () => {
    resetForm();
    setIsCreating(true);
    setIsEditing(false);
    setEditingSpot(null);
  };

  const handleEdit = (spot: SurfSpot) => {
    setFormData({
      name: spot.name,
      description: spot.description,
      waveType: spot.waveType,
      skillLevel: spot.skillLevel,
      bestSeason: spot.bestSeason,
      tideConditions: spot.tideConditions,
      latitude: spot.coordinates[0],
      longitude: spot.coordinates[1],
      forecastUrl: spot.forecastUrl,
      imageUrl: spot.imageUrl
    });
    setEditingSpot(spot);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!tableExists) {
      toast.error('Database table not available');
      return;
    }

    setLoading(true);
    try {
      if (isCreating) {
        const { error } = await supabase
          .from('surf_spots')
          .insert([{
            name: formData.name,
            description: formData.description,
            wave_type: formData.waveType,
            skill_level: formData.skillLevel,
            best_season: formData.bestSeason,
            tide_conditions: formData.tideConditions,
            latitude: formData.latitude,
            longitude: formData.longitude,
            forecast_url: formData.forecastUrl,
            image_url: formData.imageUrl,
            is_active: true
          }]);

        if (error) throw error;
        toast.success('Surf spot created successfully!');
      } else if (editingSpot) {
        const { error } = await supabase
          .from('surf_spots')
          .update({
            name: formData.name,
            description: formData.description,
            wave_type: formData.waveType,
            skill_level: formData.skillLevel,
            best_season: formData.bestSeason,
            tide_conditions: formData.tideConditions,
            latitude: formData.latitude,
            longitude: formData.longitude,
            forecast_url: formData.forecastUrl,
            image_url: formData.imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingSpot.id);

        if (error) throw error;
        toast.success('Surf spot updated successfully!');
      }

      handleCancel();
      onSpotsUpdate();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (spot: SurfSpot) => {
    if (!tableExists) {
      toast.error('Database table not available');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${spot.name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('surf_spots')
        .update({ is_active: false })
        .eq('id', spot.id);

      if (error) throw error;
      toast.success('Surf spot deleted successfully!');
      onSpotsUpdate();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditingSpot(null);
    resetForm();
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout from admin panel?')) {
      logoutAdmin();
    }
  };

  if (!tableExists) {
    return (
      <div className={`min-h-screen ${themeClasses.bg} pt-16 overflow-x-hidden`}>
        <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          <div className={`${themeClasses.cardBg} p-3 sm:p-4 lg:p-6 text-center rounded-xl shadow-xl`}>
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className={`text-base sm:text-lg lg:text-2xl font-bold ${themeClasses.text} mb-4`}>Database Setup Required</h2>
            <p className={`text-xs sm:text-sm lg:text-base ${themeClasses.textSecondary} mb-6`}>
              The surf spots database table hasn't been created yet. Please run the SQL migration script in your Supabase dashboard to enable admin functionality.
            </p>
            <div className={`${themeClasses.cardBg} p-3 sm:p-4 rounded-lg border ${themeClasses.border}`}>
              <p className={`text-xs sm:text-sm ${themeClasses.textSecondary} mb-2`}>Steps to setup:</p>
              <ol className={`text-xs sm:text-sm ${themeClasses.text} text-left space-y-1`}>
                <li>1. Go to your Supabase dashboard</li>
                <li>2. Navigate to SQL Editor</li>
                <li>3. Run the migration script to create the surf_spots table</li>
                <li>4. Refresh this page</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg} pt-16 overflow-x-hidden`}>
      {/* Header */}
      <div className={`${themeClasses.cardBg} border-b ${themeClasses.border} p-2 sm:p-3 md:p-4 lg:p-6`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-2 sm:space-y-3 mb-3 sm:mb-4">
            <div className={`p-1 sm:p-2 ${themeClasses.headerBg} rounded-md sm:rounded-lg shadow-sm`}>
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-center">
              <h1 className={`text-sm sm:text-lg md:text-xl lg:text-3xl font-bold ${themeClasses.accent}`}>Admin Panel</h1>
              <p className={`text-xs sm:text-sm ${themeClasses.textSecondary}`}>Manage surf spots and content</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-1 sm:space-y-2 max-w-xs sm:max-w-sm mx-auto">
            <button
              onClick={handleCreate}
              disabled={loading}
              className={`${themeClasses.button} px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg font-medium flex items-center justify-center space-x-1 sm:space-x-2 text-xs w-full transition-all duration-300 shadow-sm`}
            >
              <Plus className="w-3 h-3" />
              <span>Add New Spot</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg font-medium flex items-center justify-center space-x-1 sm:space-x-2 text-xs w-full transition-all duration-300 shadow-sm"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-6 space-y-3 sm:space-y-4 max-w-4xl mx-auto">

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <div className={`${themeClasses.cardBg} p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-sm`}>
            <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
              <h2 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold ${themeClasses.text}`}>
                {isCreating ? 'Create New Surf Spot' : 'Edit Surf Spot'}
              </h2>
              <button
                onClick={handleCancel}
                className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Spot Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter spot name"
                />
              </div>

              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Wave Type
                </label>
                <input
                  type="text"
                  value={formData.waveType}
                  onChange={(e) => setFormData({ ...formData, waveType: e.target.value })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Right-hand reef break"
                />
              </div>

              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Skill Level
                </label>
                <select
                  value={formData.skillLevel}
                  onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Best Season
                </label>
                <input
                  type="text"
                  value={formData.bestSeason}
                  onChange={(e) => setFormData({ ...formData, bestSeason: e.target.value })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., April to October"
                />
              </div>

              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Tide Conditions
                </label>
                <input
                  type="text"
                  value={formData.tideConditions}
                  onChange={(e) => setFormData({ ...formData, tideConditions: e.target.value })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Mid tide"
                />
              </div>

              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="-8.675539"
                />
              </div>

              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="116.767209"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg h-12 sm:h-16 md:h-20 resize-none text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Describe the surf spot..."
                />
              </div>

              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Forecast URL
                </label>
                <input
                  type="url"
                  value={formData.forecastUrl}
                  onChange={(e) => setFormData({ ...formData, forecastUrl: e.target.value })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="https://www.surf-forecast.com/..."
                />
              </div>

              <div>
                <label className={`block text-xs font-medium ${themeClasses.text} mb-1 sm:mb-2`}>
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="https://images.pexels.com/..."
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1 sm:space-y-2 mt-3 sm:mt-4">
              <button
                onClick={handleCancel}
                disabled={loading}
                className={`px-2 sm:px-3 py-1 sm:py-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors text-xs w-full text-center`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`${themeClasses.button} px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg font-medium flex items-center justify-center space-x-1 sm:space-x-2 text-xs w-full transition-all duration-300 shadow-sm`}
              >
                <Save className="w-3 h-3" />
                <span>{loading ? 'Saving...' : 'Save Spot'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Spots List */}
        <div className={`${themeClasses.cardBg} rounded-lg sm:rounded-xl shadow-sm overflow-hidden`}>
          <div className={`p-2 sm:p-3 md:p-4 border-b ${themeClasses.border}`}>
            <h2 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold ${themeClasses.text} text-center`}>Surf Spots ({spots.length})</h2>
          </div>
          
          <div className={`divide-y ${themeClasses.border} max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto`}>
            {spots.map((spot) => (
              <div key={spot.id} className={`p-2 sm:p-3 md:p-4 flex items-center justify-between hover:${themeClasses.buttonHover} transition-colors`}>
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className={`p-1 sm:p-2 ${themeClasses.headerBg} rounded-md sm:rounded-lg shadow-sm`}>
                    <Waves className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold ${themeClasses.text} text-xs truncate`}>{spot.name}</h3>
                    <div className={`text-xs ${themeClasses.textSecondary} truncate`}>
                      {spot.skillLevel} • {spot.waveType}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(spot)}
                    disabled={loading}
                    className={`p-1 sm:p-2 ${themeClasses.textSecondary} hover:${themeClasses.accent} transition-colors rounded-md sm:rounded-lg`}
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(spot)}
                    disabled={loading}
                    className={`p-1 sm:p-2 ${themeClasses.textSecondary} hover:text-red-500 transition-colors rounded-md sm:rounded-lg`}
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}