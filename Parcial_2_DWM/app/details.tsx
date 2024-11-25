/*Aca se muestran los detalles una vez cargados*/
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getInfoById } from "./appi.tsx";



const Details = () => {
  const params = useLocalSearchParams();
  const[showEditar, setShowEditar] = useState(false);
  const [team, setTeam] = useState({} as any);
  useEffect(() => {
    const fetchInfo = async () => {
      const response = await getInfoById(params.id as string);
      setTeam(response);
    };

    fetchInfo();
  }, []);

  return (
  <View>
    <Stack.Screen
      options={{
        title: "Detalles del Equipo",
        headerStyle: { backgroundColor: "#f4511e" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
        {team && (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              width: "90%",
              margin: 16,
              padding: 16,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{team.name}</Text>
            <Text style={{ fontWeight: "normal" }}>Descripción: {team.description}</Text>
            <Text style={{ fontWeight: "normal" }}>Goles: {team.goals}</Text>
            <Text>Puntos: {team.points} </Text>
          </View>
        )}
  </View>
);
};



export default Details;