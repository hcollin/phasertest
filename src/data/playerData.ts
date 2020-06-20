import { PlayerShape, shapeOne, shapeTwo, shapeThree } from "../objects/polygons/PlayerShape";


interface PlayerData {
    health: number;
    energy: number;
    points: number;
    diamondsCollected: number;
    shapeno: number;
    shapes: PlayerShape[];
    xPos: number;    

    reset: () => void;
    getShape: () => PlayerShape;
    nextShape: () => void;
    prevShape: () => void;
    pickDiamond: () => void;
    getPoints: () => number;
    death: () => void;

    setDamage: (damage: number) => boolean;
    getStatus: () => PlayerStatus;
}

export interface PlayerStatus {
    health: number;
    energy: number;
    shapeno: number;
    points: number;
    diamondsCollected: number;
    alive: boolean;
}


function createPlayer(): PlayerData {

    let health = 100;
    let shapeno = 0;
    let energy = 100;
    let points = 0;
    let diamondsCollected = 0;

    let xPos = 0;

    const shapes = [shapeOne, shapeTwo, shapeThree];

    function reset() {
        health = 100;
        energy = 100;
        shapeno = 0;
        
    }

    function nextShape() {
        shapeno++;
        if(shapeno >= shapes.length) {
            shapeno = 0;
        }
    }

    function prevShape() {
        shapeno--;
        if(shapeno < 0) {
            shapeno = shapes.length -1;
        }
    }

    function getShape(): PlayerShape {
        return shapes[shapeno];
    }

    function pickDiamond() {
        points += 100;
        diamondsCollected++;
        
    }

    function getPoints(): number {
        return points;
    }

    function death() {
        points = 0;
        shapeno = 0;
        energy = 100;
        diamondsCollected = 0;
        xPos = 0;
    }

    function setDamage(damageTaken=1) {
        
        health -= damageTaken;
        return health > 0;
    }

    function getStatus(): PlayerStatus {
        return {
            points,
            health,
            shapeno,
            energy,
            diamondsCollected,
            alive: health > 0
        };
    }

    return {
        health,
        energy,
        points,
        diamondsCollected,
        shapeno,
        shapes,
        xPos,
        
        reset,
        getShape,
        nextShape,
        prevShape,
        pickDiamond,
        getPoints,
        death,
        setDamage,
        getStatus,
    }

}

export const playerData = createPlayer();


