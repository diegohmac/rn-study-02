import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        const players = await playerGetByGroup(group);
        
        const playerAlreadyExists = players.find(player => player.name === newPlayer.name);
        if (playerAlreadyExists) {
            throw new AppError('Player already exists');
        }

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...players, newPlayer]));
    } catch (error) {
        throw error;
    }
}