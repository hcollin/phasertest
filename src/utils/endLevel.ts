
export default function endLevel(scene: Phaser.Scene) {
    scene.scene.stop();
    scene.sound.stopAll();
    
    scene.game.scene.switch("activeLevel", "LevelSelector");
    scene.scene.resume("LevelSelector");
    scene.scene.setVisible(true, "LevelSelector");
    scene.scene.start("LevelSelector");
    scene.scene.remove("activeLevel");
}