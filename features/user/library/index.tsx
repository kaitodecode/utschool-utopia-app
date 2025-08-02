import { useAuth } from "@/stores/auth";
import { router } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";

interface Story {
  id: string;
  content: string;
  photo?: string;
  title: string;
  genre_id: FirestoreReference;
}

interface FirestoreReference {
  _firestore: {
    projectId: string;
  };
  _path: {
    segments: string[];
  };
  _converter: Record<string, never>;
}

interface LibraryItem {
  id: string;
  story_id: FirestoreReference;
  email: string;
  is_finish: boolean;
  story: Story;
}

export default function LibraryScreen() {
    const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
    const {user} = useAuth();

    const fetchLibraryItems = async() => {
        try {
            const response = await axios.get("https://77d468dee296.ngrok-free.app/stories/user/"+user?.email);
            setLibraryItems(response.data.data);
        } catch (error) {
            // console.log("Error fetching library items:", error);
        }
    }
    
    const toggleFinishStatus = async (itemId: string, currentStatus: boolean) => {
        try {
            await axios.put(`https://77d468dee296.ngrok-free.app/reading/${itemId}`, {
                is_finish: !currentStatus
            });
            await fetchLibraryItems();
        } catch (error) {
            // console.error("Error updating finish status:", error);
        }
    }

    useEffect(() => {
        fetchLibraryItems();
    }, []);

    const renderStoryItem = ({ item }: { item: LibraryItem }) => (
        <TouchableOpacity
            className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
            activeOpacity={0.95}
            onPress={() => router.push({
                pathname: "/user/story/detail",
                params: { id: item.story?.id }
            })}
        >
            {item.story?.photo && (
                <View className="w-full h-48">
                    <Image
                        source={{ uri: item.story.photo }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>
            )}

            <View className="p-4">
                <View className="flex-row justify-between items-center mb-2">
                    <Text
                        className="text-lg font-bold text-gray-800 flex-1"
                        numberOfLines={1}
                    >
                        {item.story?.title || 'Untitled'}
                    </Text>
                    <View className={`px-3 py-1 rounded-full ${item.is_finish ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <Text className={`text-xs ${item.is_finish ? 'text-green-600' : 'text-yellow-600'}`}>
                            {item.is_finish ? 'Finished' : 'In Progress'}
                        </Text>
                    </View>
                </View>

                <Text
                    className="text-gray-600 text-sm leading-5 mb-3"
                    numberOfLines={3}
                >
                    {item.story?.content || 'No content available'}
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
                    <View className="flex-row space-x-2">
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                toggleFinishStatus(item.id, item.is_finish);
                            }}
                            className={`px-4 py-2 rounded-lg me-3 ${item.is_finish ? 'bg-yellow-500' : 'bg-green-500'}`}>
                            <Text className="text-white font-medium">
                                {item.is_finish ? 'Mark Unfinished' : 'Mark Finished'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push({
                                pathname: "/user/story/read",
                                params: { id: item.story?.id }
                            })}
                            className="bg-yellow-400 px-4 py-2 rounded-lg">
                            <Text className="text-white font-medium">Read</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const EmptyListComponent = () => (
        <View className="flex-1 justify-center items-center h-full mt-20">
            <Image 
                source={{ uri: 'https://raw.githubusercontent.com/traez/random-images/main/empty-library.png' }}
                className="w-64 h-64"
                resizeMode="contain"
            />
            <Text className="text-xl font-bold text-gray-800 mt-4">
                Your Library is Empty
            </Text>
            <Text className="text-gray-600 text-center mt-2 px-4">
                Looks like you haven't added any stories to your library yet.
            </Text>
            {/* <TouchableOpacity
                onPress={() => router.push("/user/explore")}
                className="mt-6 bg-yellow-400 px-6 py-3 rounded-full"
            >
                <Text className="text-white font-medium">Explore Stories</Text>
            </TouchableOpacity> */}
        </View>
    );

    return (
        <View className="bg-slate-100 pb-20">
            <FlatList
                data={libraryItems}
                renderItem={renderStoryItem}
                showsVerticalScrollIndicator={false}
                className="px-4 h-full mt-5"
                ListEmptyComponent={EmptyListComponent}
            />
        </View>
    );
}