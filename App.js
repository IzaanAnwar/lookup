import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import MealDetails from './components/Dish';

export default function App() {
  const [isFocused, setIsFocused] = useState(false)
  const [dish, setDish] = useState("")
  const [meals, setMeals] = useState([])
  const [selectedMeal, setSelectedMeal] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchDish = useCallback(async () => {
    setIsLoading(true)
    setSelectedMeal(null)
    try {
      if (!dish) {
        throw new Error('nothing is there to search')
      }
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`, {
        method: "GET"
      })

      const data = await response.json();
      console.log({ data })
      setMeals(data?.meals);

    } catch (error) {
      alert(error?.message || "Something went wrong. Please try again")
    } finally { setIsLoading(false) }
  }, [dish])

  return (
    <View style={styles.container}>

      <View style={[styles.searchInputBar, isFocused && styles.searchInputBarFocused]}>
        <TextInput
          onChangeText={e => setDish(e)}
          style={styles.input}
          placeholder="Search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchDish}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {isLoading ? <Text style={{paddingTop:64}}>Loading...</Text>:<MealViewSection selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} meals={meals} />}
      
      <StatusBar style="auto" />
    </View>
  );
}

function MealViewSection({selectedMeal, setSelectedMeal, meals}) {
return <>
  {!selectedMeal && <ScrollView style={styles.mealsContainer}>
        {meals.map(meal => {

          return <TouchableOpacity key={meal?.idMeal} style={styles.mealContainer} onPress={() => {
            const selMeal = meals.find(item => item?.idMeal === meal.idMeal)
            console.log({selMeal});
            setSelectedMeal(selMeal)
          }}>
            <Image source={{ uri: meal?.strMealThumb }} style={styles.image} alt={meal?.strMeal || "Meal Image"} />
            <Text style={styles.title}>{meal?.strMeal}</Text>
          </TouchableOpacity>

        }
        )}
      </ScrollView>}

      {selectedMeal && <MealDetails meal={selectedMeal} />}
</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 56
  },
  mealContainer: {
    display:"flex",
    flexDirection:"row",
    width:'100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap:8,
    paddingVertical:8,

  },
  mealsContainer: {
    paddingTop: 56,
    width:'100%',
    
   

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:"left"
  },
  image: {
    height: 24,
    width:24,
    resizeMode: 'cover',
  },

  searchInputBar: {
    backgroundColor: "#e8e8e8",
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: 'transparent',
    width: "100%",
    borderWidth: 2,
  },
  searchInputBarFocused: {
    borderColor: "#0000ff",
  },
  input: {
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0000ff",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 'bold',
  },

});
