import { MAPBOX_API_KEY } from '@env';

export const fetchLocationSuggestions = async (searchText) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${MAPBOX_API_KEY}&autocomplete=true&limit=5`
    );
    const data = await response.json();
    return data.features;
  } catch (error) {
    console.error('Mapbox fetch error:', error);
    return [];
  }
};
