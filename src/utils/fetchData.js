export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': 'dd79239508mshdd5029b0b012eddp159fa2jsn9835c48ea6ab',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': 'dd79239508mshdd5029b0b012eddp159fa2jsn9835c48ea6ab',
  },
};

export const fetchData = async (url, options) => {
  // const res = await fetch(url, options);
  // const data = await res.json();

  // return data;
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    return []; // Ensure it always returns an array
  }
};
