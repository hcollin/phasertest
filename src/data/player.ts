

interface PlayerData {
    health: number;
    shapeno: number;
    reset: () => void;
}


function createPlayer(): PlayerData {

    let health = 100;
    let shapeno = 0;

    function reset() {
        health = 100;
        shapeno = 0;
    }

    return {
        health,
        shapeno,
        reset
    }

}

export const playerData = createPlayer();


