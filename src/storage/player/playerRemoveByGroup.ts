import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerRemoveByGroup(group: string, playerName: string) {
    try {
        const players = await playerGetByGroup(group);
        const updatedPlayers = players.filter(player => player.name !== playerName);
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(updatedPlayers));
        return updatedPlayers;
    } catch (error) {
        throw error;
    }
}