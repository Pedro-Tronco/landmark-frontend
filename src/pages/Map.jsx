import { useEffect, useContext, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";
import { InputText } from "../components/InputText";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Como pegar a posição atual do usuário?
// Dica: use Geolocation API do navegador
const center = {
  lat: -23.55052,
  lng: -46.633308,
};

export const Map = () => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [pendingLatLng, setPendingLatLng] = useState(null);

  // Substitua pela sua chave da API do Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchMarkers() {
      try {
        const data = await getPoints(token);
        setMarkers(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, [token]);

  // Função para adicionar ponto ao clicar no mapa
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setPendingLatLng({ lat, lng });
    setShowInput(true);
  };

  const handleConfirm = async (name) => {
    if (!pendingLatLng) return;
    const newPoint = {
      lat: pendingLatLng.lat,
      lng: pendingLatLng.lng,
      description: name,
    };
    try {
      const savedPoint = await postPoint(token, newPoint);
      const savedMarker = {
        id: savedPoint.id,
        title: name || "Novo Ponto",
        position: {
          lat: savedPoint.lat,
          lng: savedPoint.lng,
        },
      };
      setMarkers((prev) => [...prev, savedMarker]);
    } catch (error) {
      alert(error.message);
    }
    setShowInput(false);
    setPendingLatLng(null);
  };

  const handleCancel = () => {
    setShowInput(false);
    setPendingLatLng(null);
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "100%", height: "88%", position: "relative" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
            mapTypeId="satellite"
          >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}
        {showInput && (
          <InputText
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </>
  );
};
