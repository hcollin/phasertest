import { LevelSceneInterface } from "../interfaces/Interfaces";


export interface CollisionCategories {
    init: (scene: LevelSceneInterface) => void;
    All: number;
    Player: number;
    Pickup: number;
    Static: number;
    Enemy: number;
}

function createCollisionCategories(): CollisionCategories {

    let initialized = false;
    
    const categories: Map<string, number> = new Map<string, number>();


    function init(scene: LevelSceneInterface) {
        if(initialized) return;

        // Initialize categories
        categories.set("Player", scene.matter.world.nextCategory());
        categories.set("Pickup", scene.matter.world.nextCategory());
        categories.set("Static", scene.matter.world.nextCategory());
        categories.set("Enemy", scene.matter.world.nextCategory());
    }

    return {
        init,
        All: -1,
        get Player() {
            return categories.get("Player")
        },
        get Pickup() {
            return categories.get("Player")
        },
        get Static() {
            return categories.get("Player")
        },
        get Enemy() {
            return categories.get("Player")
        },
    }

}

const collCategory = createCollisionCategories();

export default collCategory;