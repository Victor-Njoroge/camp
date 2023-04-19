import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bl_lat ? bl_lat : "25.15543993776612",
          tr_latitude: tr_lat ? tr_lat : "25.41257834546226",
          bl_longitude: bl_lng ? bl_lng : "51.39587210719369",
          tr_longitude: tr_lng ? tr_lng : "51.62812119686502",
          limit: "30",
          currency: "USD",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
            'X-RapidAPI-Key': '187882b51bmshe44dfc8172e8e0ep160f0djsn9e44e22eb233',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};