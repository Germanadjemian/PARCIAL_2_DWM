import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Image, TextInput, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import { getInfoById } from "./appi.tsx";

const Details = () => {
  const params = useLocalSearchParams();
  const [team, setTeam] = useState({} as any);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTeam, setupdatedTeam] = useState({} as any);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await getInfoById(params.id as string);
      setTeam(response);
      setupdatedTeam(response);
    };

    fetchInfo();
  }, [params.id]);

  const updateTeam = async () => {
    try {
      const response = await fetch(`http://161.35.143.238:8000/gadjemian/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeam),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setTeam(updatedData);
        setIsEditing(false);
        Alert.alert("Éxito", "El Equipo fue actualizado correctamente.");
      } else {
        Alert.alert("Error", "No se pudo actualizar el Equipo. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al actualizar el Equipo:", error);
      Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
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
      {isEditing ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="ID del Equipo"
            value={updatedTeam.id}
            onChangeText={(text) => setupdatedTeam({ ...updatedTeam, id: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del Equipo"
            value={updatedTeam.name}
            onChangeText={(text) => setupdatedTeam({ ...updatedTeam, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={updatedTeam.description}
            onChangeText={(text) => setupdatedTeam({ ...updatedTeam, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Imagen URL"
            value={updatedTeam.image}
            onChangeText={(text) => setupdatedTeam({ ...updatedTeam, image: text })}
          />
          <Button title="Guardar Cambios" onPress={updateTeam} />
          <Button title="Cancelar" onPress={() => setIsEditing(false)} />
        </View>
      ) : (
        <View style={styles.card}>
          <Image source={{ uri: team.image }} style={styles.image} />
          <Text style={styles.title}>{team.name}</Text>
          <Text>{team.description}</Text>
          <Text>ID: {team.id}</Text>
          <Button title="Editar" onPress={() => setIsEditing(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    margin: 16,
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
});

export default Details;
