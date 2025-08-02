import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { GenreSection, Story } from "../home";

export default function StoryScreen() {
    const { id } = useLocalSearchParams();
    const genreId = id as string;

    const [GenreStories, setGenreStories] = useState<GenreSection>();
    const [Genres, setGenres] = useState<GenreSection[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreSection>();

    const fetchStory = async () => {
        try {
            const response = await axios.get(`https://77d468dee296.ngrok-free.app/stories`);
            const stories = response.data.data;
            setGenres(stories);

            // Set initial genre stories
            const initialStories = stories.find((item: GenreSection) => item.genre_id === genreId) || stories[0];
            setGenreStories(initialStories);
            setSelectedGenre(initialStories);
        } catch (error) {
            console.error("Error fetching story:", error);
        }
    }

    const handleGenreSelect = (genre: GenreSection) => {
        setSelectedGenre(genre);
        setGenreStories(genre);
    }

    useEffect(() => {
        fetchStory();
    }, []);

    const renderGenreItem = ({ item }: { item: GenreSection }) => (
        <TouchableOpacity
            key={item.genre_id}
            onPress={() => handleGenreSelect(item)}
            className={`px-5 me-2 h-12 flex items-center justify-center rounded-lg mx-1 ${selectedGenre?.genre_id === item.genre_id
                    ? 'bg-yellow-400'
                    : 'bg-gray-100'
                }`}
        >
            <Text className={`text-sm font-medium ${selectedGenre?.genre_id === item.genre_id
                    ? 'text-white'
                    : 'text-gray-700'
                }`}>
                {item.genre}
            </Text>
        </TouchableOpacity>
    );

    const renderStoryItem = ({ item, index }: { item: Story, index: number }) => (
        <TouchableOpacity
            className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
            activeOpacity={0.95}
            onPress={() => router.push({
                pathname: "/user/story/detail",
                params: { id: item.id }
            })}
        >
            {/* Thumbnail */}
            <View className="w-full h-48">
                {item.photo && (
                    <Image
                        source={{ uri: item.photo }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                )}
            </View>

            {/* Content */}
            <View className="p-4">
                <Text
                    className="text-lg font-bold text-gray-800 mb-2"
                    numberOfLines={1}
                >
                    {item.title}
                </Text>

                <Text
                    className="text-gray-600 text-sm leading-5 mb-3"
                    numberOfLines={3}
                >
                    {item.content}
                </Text>

                <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
                    <View className="flex-row items-center space-x-4">
                        <View className="flex-row items-center">
                            <Text className="text-yellow-500 text-sm">⭐</Text>
                            <Text className="text-gray-500 text-sm ml-1">4.5</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-yellow-500 text-sm">👁️</Text>
                            <Text className="text-gray-500 text-sm ml-1">1.2k</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: "/user/story/read",
                            params: { id: item.id }
                        })}
                        className="bg-yellow-400 px-4 py-2 rounded-lg">
                        <Text className="text-white font-medium">Read</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="bg-slate-100 pb-40">
            {/* Genre Selection */}
            <FlatList
                data={Genres}
                renderItem={renderGenreItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="p-3"
            />

            {/* Stories List */}
            <FlatList
                data={GenreStories?.stories}
                renderItem={renderStoryItem}
                showsVerticalScrollIndicator={false}
                className="px-4 h-full mt-5"
            />
        </View>
    )
}
