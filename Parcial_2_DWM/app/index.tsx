import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, StyleSheet, Button, TextInput, Alert } from "react-native";
import { getInfo } from "./appi.tsx";
import { Stack } from "expo-router";
import { Link } from "expo-router";

export default function Index() {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [check, setCheck] = useState(false);
  const [newTeam, setNewTeam] = useState({
    id: "",
    name: "",
    description: "",
    goals: "",
    points: "",
    image: "",
  });

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await getInfo();
      setTeams(response);
    };

    fetchInfo();
  }, []);


  const handleAddPlanet = () => {
    setShowForm(true); 
  };

  const handleConfirmacion = () => {
    setCheck(true);
  };

  const handleConfirmacionFalse = () => {
    setCheck(false);
  };

  const handleDeletePlanet = async (id: String) => {
    try {
      const response = await fetch(`http://161.35.143.238:8000/gadjemian/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setTeams(teams.filter((team: any) => team.id !== id));
        Alert.alert("Éxito", "El team fue eliminado correctamente.");
      } else {
        Alert.alert("Error", "No se pudo eliminar el team. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al eliminar el team:", error);
      Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
    }
  };


  const handleSubmit = async () => {
    try {
      const moonNamesArray = newTeam.points.split(",").map((name) => name.trim()); // Convertir string a array

      const planetData = {
        ...newTeam,
        points: moonNamesArray,
      };

  

      const response = await fetch("http://161.35.143.238:8000/gadjemian", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planetData), 
      });

      if (response.ok) {
        const createdPlanet = await response.json();
        setTeams([...teams, createdPlanet] as any); 
        setShowForm(false); 
        setNewTeam({
          id: "",
          name: "",
          description: "",
          goals: "",
          points: "",
          image: "",
        }); 
        Alert.alert("Éxito", "El team fue agregado correctamente.");
      } else {
        Alert.alert("Error", "No se pudo agregar el team. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "COPA SUDAMERICA",
          headerStyle: { backgroundColor: "#4a90e2" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

        {/*Este es el modal por donde se pasan los datos para agregar un equipo*/}

      {showForm ? (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Agregar Nuevo Equipo</Text>
          <TextInput
            style={styles.input}
            placeholder="ID del Equipo"
            value={newTeam.id}
            onChangeText={(text) => setNewTeam({ ...newTeam, id: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del Equipo"
            value={newTeam.name}
            onChangeText={(text) => setNewTeam({ ...newTeam, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={newTeam.description}
            onChangeText={(text) => setNewTeam({ ...newTeam, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="N° de Goles"//Aca iba "Nombres de Lunas (separados por comas)"
            value={newTeam.goals}
            onChangeText={(text) => setNewTeam({ ...newTeam, goals: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Puntos"//Aca iba "Nombres de Lunas (separados por comas)"
            value={newTeam.points}
            onChangeText={(text) => setNewTeam({ ...newTeam, points: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="URL de la Imagen"
            value={newTeam.image}
            onChangeText={(text) => setNewTeam({ ...newTeam, image: text })}
          />
          <View style={styles.buttonGroup}>
            <Button title="Guardar" onPress={handleSubmit} color="#4a90e2" />
            <Button title="Cancelar" onPress={() => setShowForm(false)} color="#f4511e" />
          </View>
        </View>
      ) : (
        <>
          {teams &&
            teams.map((team: any) => (
              <View key={team.id} style={styles.card}>
                <Link
                  href={{
                    pathname: "/details",
                    params: { id: team.id },
                  }}
                >
                  <Text style={styles.planetName}>{team.name}</Text>
                  <Image source={{ uri: team.image }} style={styles.planetImage} />
                </Link>
                <Button title="Eliminar" onPress={() => handleDeletePlanet(team.id)} color="#f4511e" />
              </View>
            ))};

          <View style={styles.buttonContainer}>
            <Button title="Agregar Equipo" onPress={handleAddPlanet} color="#4a90e2" />
          </View>
        </>
      )
      }
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  planetName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },
  planetImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
