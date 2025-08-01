import { supabase } from '../lib/supabase';
import { SurfSpot } from '../types';

// Static fallback data
export const SURF_SPOTS: SurfSpot[] = [
  {
    id: 'northern-right',
    name: 'Northern Right Beach',
    description: 'A consistent right-hand break offering clean waves and less crowded conditions.',
    waveType: 'Right-hand reef break',
    skillLevel: 'Intermediate',
    bestSeason: 'April to October',
    tideConditions: 'Mid tide',
    coordinates: [-8.675539, 116.767209],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Northern-Rights/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'dirty-hippies',
    name: 'Dirty Hippies Beach',
    description: 'A fun, playful right-hander that provides long, clean rides when conditions are right. Less crowded than some of the more famous spots.',
    waveType: 'Right-hand reef break',
    skillLevel: 'Intermediate',
    bestSeason: 'May to September',
    tideConditions: 'Mid tide',
    coordinates: [-8.675997, 116.772528],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Dirty-Hippies/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'mangrove',
    name: 'Mangrove Beach',
    description: 'A scenic spot surrounded by mangrove forests, offering consistent waves suitable for various skill levels.',
    waveType: 'Reef break',
    skillLevel: 'Beginner to Intermediate',
    bestSeason: 'April to October',
    tideConditions: 'Mid to high tide',
    coordinates: [-8.717674, 116.781184],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Mangrove/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'limestone',
    name: 'Limestone Beach',
    description: 'Named after the dramatic limestone cliffs that frame this spot, offering clean waves over a reef bottom.',
    waveType: 'Reef break',
    skillLevel: 'Intermediate',
    bestSeason: 'May to September',
    tideConditions: 'Mid tide',
    coordinates: [-8.722857, 116.775871],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Limestone/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'scar-reef',
    name: 'Scar Reef Beach',
    description: 'A world-class left-hand reef break with long, powerful waves that can offer barrel sections and wall sections for high-performance surfing.',
    waveType: 'Left-hand reef break',
    skillLevel: 'Intermediate to Advanced',
    bestSeason: 'April to October',
    tideConditions: 'Mid to high tide',
    coordinates: [-8.862500, 116.755550],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Scar-Reef/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1032653/pexels-photo-1032653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'bingin',
    name: 'Bingin Beach',
    description: 'A beautiful reef break known for its crystal-clear waters and perfect barrels.',
    waveType: 'Left-hand reef break',
    skillLevel: 'Intermediate to Advanced',
    bestSeason: 'April to October',
    tideConditions: 'Mid tide',
    coordinates: [-8.853056, 116.762987],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Bingin/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1032652/pexels-photo-1032652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'phantom',
    name: 'Phantom Beach',
    description: 'A hidden gem offering long right-hand waves with multiple sections.',
    waveType: 'Right-hand point break',
    skillLevel: 'Intermediate to Advanced',
    bestSeason: 'May to September',
    tideConditions: 'Mid to high tide',
    coordinates: [-8.842987, 116.765122],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Phantom/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1032651/pexels-photo-1032651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'super-suck',
    name: 'Super Suck Beach',
    description: 'One of the most perfect and dangerous waves in Indonesia, offering intense barrels that suck up and throw over a shallow reef. Not for the faint-hearted.',
    waveType: 'Hollow, barreling right-hand reef break',
    skillLevel: 'Advanced to Expert',
    bestSeason: 'May to September',
    tideConditions: 'Mid tide',
    coordinates: [-8.931197, 116.741369],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Super-Suck/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'yoyos',
    name: 'Yoyo\'s Beach',
    description: 'A fun, consistent right-hander that works well on a variety of swells and offers long rides with multiple sections.',
    waveType: 'Right-hand reef break',
    skillLevel: 'Beginner to Intermediate',
    bestSeason: 'March to November',
    tideConditions: 'All tides, best at mid tide',
    coordinates: [-8.971933, 116.726467],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Yo-Yos/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1032652/pexels-photo-1032652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'tropical',
    name: 'Tropical Beach',
    description: 'A lesser-known spot that offers playful, rippable waves over a coral reef with beautiful surroundings.',
    waveType: 'Left-hand reef break',
    skillLevel: 'Intermediate',
    bestSeason: 'April to October',
    tideConditions: 'Mid to high tide',
    coordinates: [-9.000010, 116.739827],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Tropicals/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1032656/pexels-photo-1032656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'sedjorong',
    name: 'Sedjorong Beach',
    description: 'A secluded spot offering consistent waves and beautiful coastal scenery.',
    waveType: 'Reef break',
    skillLevel: 'Intermediate',
    bestSeason: 'April to October',
    tideConditions: 'Mid tide',
    coordinates: [-9.036304, 116.799970],
    forecastUrl: 'https://www.surf-forecast.com/breaks/Sedjorong/forecasts/latest',
    imageUrl: 'https://images.pexels.com/photos/1032657/pexels-photo-1032657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Function to fetch spots from database with fallback to static data
export async function fetchSpotsFromDatabase(): Promise<SurfSpot[]> {
  try {
    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log('📊 Supabase not configured, using static data');
      return SURF_SPOTS;
    }

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const { data, error } = await supabase
      .from('surf_spots')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (error) {
      // If table doesn't exist or other error, silently fall back to static data
      if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist') || error.message.includes('Failed to fetch')) {
        console.log('📊 Using static surf spots data (database table not found)');
        return SURF_SPOTS;
      }
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('📊 No spots found in database, using static data');
      return SURF_SPOTS;
    }

    // Transform database data to match SurfSpot interface
    const transformedSpots: SurfSpot[] = data.map(spot => ({
      id: spot.id,
      name: spot.name,
      description: spot.description,
      waveType: spot.wave_type,
      skillLevel: spot.skill_level,
      bestSeason: spot.best_season,
      tideConditions: spot.tide_conditions,
      coordinates: [spot.latitude, spot.longitude] as [number, number],
      forecastUrl: spot.forecast_url,
      imageUrl: spot.image_url
    }));

    console.log(`✅ Loaded ${transformedSpots.length} surf spots from database`);
    return transformedSpots;

  } catch (error) {
    // Handle network errors, timeouts, and other issues
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log('📊 Database request timeout, using static data');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.log('📊 Network error connecting to database, using static data');
      } else {
        console.log('📊 Database error, using static data:', error.message);
      }
    } else {
      console.log('📊 Unknown database error, using static data');
    }
    return SURF_SPOTS;
  }
}

// Function to load spots (tries database first, falls back to static)
export async function loadSpots(): Promise<SurfSpot[]> {
  return await fetchSpotsFromDatabase();
}