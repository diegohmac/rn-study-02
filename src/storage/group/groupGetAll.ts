import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupGetAll() {
    try {
        const rawGroups = await AsyncStorage.getItem(GROUP_COLLECTION);
        const groups: string[] = rawGroups ? JSON.parse(rawGroups) : [];
        return groups;
    } catch (error) {
        throw error;
    }
}