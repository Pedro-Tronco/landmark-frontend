import axios from 'axios';

const BASE_URL = 'https://religious-gui-landmark-8b0eba86.koyeb.app/ws/point';



export async function getPoints(token) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // o objeto response.data possui os campos lat, lng e description
    const points = response.data.map(point => ({
      id: point.id,
      title: point.description,
      position: {
        lat: point.lat,
        lng: point.lng,
      },
    }));

    if (response.status === 200) {
      return points;
    } else {
      throw new Error('Erro ao buscar pontos');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar pontos');
  }
}

export async function postPoint(token, pointData) {
  try {
    // Envia o body no formato correto para a API
    const response = await axios.post(BASE_URL, {
      lat: pointData.lat,
      lng: pointData.lng,
      description: pointData.description,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Erro ao cadastrar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar ponto');
  }
}