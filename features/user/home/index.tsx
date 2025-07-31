import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

export interface Story {
  id: string;
  title: string;
  photo: string;
  content: string;
  genre_id: {
    _firestore: {
      projectId: string;
    };
    _path: {
      segments: string[];
    };
    _converter: Record<string, unknown>;
  };
}

export interface GenreSection {
  genre: string;
  genre_id: string;
  stories: Story[];
}

export default function HomeScreen() {
  const router = useRouter();
  const [stories, setStories] = useState<GenreSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCategoryPress = (genreId: string) => {
    router.push({
        pathname: "/user/story",
        params: {
            id: genreId
        }
    })
  };

  const fetchStories = async() => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://57217e99994f.ngrok-free.app/stories");
      setStories(response.data.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setIsLoading(false);
    }
  } 

  useEffect(() => {
    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FCD34D" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="pt-10 px-5">
        <Text className="text-3xl font-bold mb-6 text-gray-900">
          Recommendations For You
        </Text>

        {stories.map((section) => (
          <View key={section.genre_id} className="mb-10">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-bold text-yellow-500">
                {section.genre}
              </Text>
              <TouchableOpacity 
                onPress={() => handleCategoryPress(section.genre_id)}
                className="flex-row items-center"
              >
                <Text className="text-yellow-500 mr-1">See All</Text>
                <Ionicons name="chevron-forward" size={24} color="#F59E0B" />
              </TouchableOpacity>
            </View>

            <Text className="text-sm text-gray-600 mb-4">
              Because you like{' '}
              <Text className="text-amber-600 font-semibold">
                {section.genre.toLowerCase()}
              </Text>
              {' '}fiction stories
            </Text>

            <FlatList
              data={section.stories}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="w-[140px] mr-4 bg-white rounded-xl shadow-lg overflow-hidden"
                  onPress={() => router.push({ 
                    pathname: '/user/story', 
                    params: { title: item.title, image: item.photo, id: item.genre_id._path.segments[1] }
                  })}
                >
                  <Image 
                    source={{ uri: item.photo }} 
                    className="w-full h-[200px] rounded-t-xl"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text 
                      numberOfLines={2} 
                      className="text-sm font-medium text-gray-800 leading-tight"
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
