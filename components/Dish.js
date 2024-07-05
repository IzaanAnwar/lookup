import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const MealDetails = ({ meal }) => {
  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
   
  } = meal;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  const handleYoutubeLink = () => {
    if (strYoutube) {
      Linking.openURL(strYoutube);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{strMeal}</Text>
      <Text style={styles.subtitle}>{`${strCategory} | ${strArea}`}</Text>
      
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredients}>{`${item.measure} ${item.ingredient}`}</Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.instructions}>{strInstructions}</Text>

      {strTags && (
        <Text style={styles.tags}>{`Tags: ${strTags}`}</Text>
      )}

      {strYoutube && (
        <TouchableOpacity style={styles.youtubeButton} onPress={handleYoutubeLink}>
          <Text style={styles.youtubeButtonText}>Watch on YouTube</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientsContainer: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
  tags: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: 'italic',
    color: '#666',
  },
  youtubeButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  youtubeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MealDetails;
