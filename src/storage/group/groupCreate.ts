import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string) {
    try {
        const groups = await groupGetAll();
        
        const groupAlreadyExists = groups.includes(newGroupName);
        if (groupAlreadyExists) {
            throw new AppError(`Team ${newGroupName} already exists`);
        }

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([newGroupName, ...groups]));
    } catch(error) {
        throw error;
    }
}