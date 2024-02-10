import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerGetByTeam(group: string, team: string) {
    try {
        const allPlayers = await playerGetByGroup(group);
        const teamPlayers = allPlayers.filter((player: PlayerStorageDTO) => player.team === team);
        return teamPlayers;
    } catch (error) {
        throw error;
    }
}