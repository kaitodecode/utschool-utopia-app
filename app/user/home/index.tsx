import HomeScreen from "@/features/user/home";
import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const dataByCategory = [
  {
    category: 'Action',
    books: [
      { id: 'a1', title: 'Cigarettes & Bullet Wounds', image: 'https://i.pinimg.com/736x/97/29/d1/9729d173b3c758e3caae8885b059a079.jpg' },
      { id: 'a2', title: 'His Queen of Darkness', image: 'https://i.pinimg.com/736x/45/ff/42/45ff42e3f1c57e994cd7ea993e014d74.jpg' },
      { id: 'a3', title: 'Crimson Ride', image: 'https://i.pinimg.com/736x/f7/c3/69/f7c3693b1d1c03ba3cf46e83430eeee9.jpg' },
      { id: 'a4', title: 'Sweet on the Surface', image: 'https://i.pinimg.com/736x/15/05/43/150543cab4e732c7af8e9200ac8323b8.jpg' },
      { id: 'a5', title: 'Waltz of the Winged Sin', image: 'https://i.pinimg.com/736x/95/ff/05/95ff054d19a45493d14ffcd8df443053.jpg' },
    ],
  },
  {
    category: 'Fantasy',
    books: [
      { id: 'f1', title: 'When the Moon Fell for the Sun', image: 'https://i.pinimg.com/736x/e8/b8/53/e8b853b21c50c51d3887e9c79f6d6f37.jpg' },
      { id: 'f2', title: 'The Girl in My Canvas', image: 'https://i.pinimg.com/1200x/17/5c/60/175c60857b8d2965bfe74e9cef7a2b05.jpg' },
      { id: 'f3', title: 'Princess Mononoke', image: 'https://i.pinimg.com/736x/ef/5e/61/ef5e61c2609a4a673965e4161af9cd89.jpg' },
      { id: 'f4', title: 'Midnight Waltz', image: 'https://i.pinimg.com/1200x/3c/ec/92/3cec9287ec530f31b25176a556a82fed.jpg' },
      { id: 'f5', title: 'Eragon', image: 'https://example.com/image10.jpg' },   
    ],
  },
  {
    category: 'Mystery',
    books: [
      { id: 'm1', title: 'Ashes of the Princess', image: 'https://i.pinimg.com/736x/ef/5e/61/ef5e61c2609a4a673965e4161af9cd89.jpg' },
      { id: 'm2', title: 'Death Note', image: 'https://example.com/image12.jpg' },
      { id: 'm3', title: 'Gone Girl', image: 'https://example.com/image13.jpg' },
      { id: 'm4', title: 'The Girl with the Dragon Tattoo', image: 'https://example.com/image14.jpg' },
      { id: 'm5', title: 'The Da Vinci Code', image: 'https://example.com/image15.jpg' }, 
    ],
  },
];

export default function HomeSlider() {
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    console.log(`Klik kategori ${category}`);
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.mainHeader}>Rekomendasi Untukmu</Text>

      {dataByCategory.map((section) => (
        <View key={section.category} style={styles.section}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{section.category}</Text>
            <TouchableOpacity onPress={() => handleCategoryPress(section.category)}>
              <Ionicons name="chevron-forward" size={22} color="#FCD34D" />
            </TouchableOpacity>
          </View>

          <Text style={styles.recommendationText}>
            Karena kamu menyukai cerita fiksi <Text style={{ color: '#F59E0B', fontWeight: 'bold' }}>{section.category.toLowerCase()}</Text>
          </Text>

          <FlatList
            data={section.books}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push({ pathname: '/user/story', params: { title: item.title, image: item.image } })}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: '#FFFBEB',
  },
  mainHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F2937',
  },
  section: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D97706',
  },
  recommendationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 10,
  },
  card: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#FFF7ED',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    elevation: 3,
    padding: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  title: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: '#374151',
  },
});
