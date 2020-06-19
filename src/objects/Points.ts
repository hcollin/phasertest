import { GameObject } from "../interfaces/GameObject";
import { playerData } from "../data/playerData";
import { GameLevelSceneInterface } from "../interfaces/Level";


export default function Points(): GameObject {

    let pointsText: Phaser.GameObjects.Text;
    let currentPoints = 0;

    function preload(scene: GameLevelSceneInterface) {}
    function create(scene: GameLevelSceneInterface) {

        pointsText = scene.add.text(scene.sys.canvas.width - 20, scene.sys.canvas.height - 16, "0", { fill: '#FFFFFF', font: '48px Arial' });
        pointsText.setScrollFactor(0);
        pointsText.setOrigin(1, 1);
        pointsText.setStroke("#000000", 5);

        const helpText = scene.add.text(scene.sys.canvas.width - 26, scene.sys.canvas.height - 5, "SCORE", { fill: '#FFFFFF', font: '16px Arial' });
        helpText.setScrollFactor(0);
        helpText.setOrigin(1, 1);
        helpText.setStroke("#000000", 3);

    }
    function update(scene: GameLevelSceneInterface) {
        const p = playerData.getPoints();
        if(currentPoints !== p) {
            currentPoints = p;
            const pText = `${currentPoints}`;
            pointsText.setText(pText);
        }
    }

    
    return {
        preload,
        create,
        update,
    }


}