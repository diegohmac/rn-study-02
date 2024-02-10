import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

import { groupGetAll } from "./groupGetAll";

export async function groupRemove(group: string) {
    try {
        const storageGroups = await groupGetAll();
        const updatedGroups = storageGroups.filter(storageGroup => storageGroup !== group);
        
        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(updatedGroups));
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);
        return updatedGroups;
    } catch (error) {
        throw error;
    }
}