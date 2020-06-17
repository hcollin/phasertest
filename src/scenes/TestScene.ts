import 'phaser';




export default class TestScene extends Phaser.Scene {

    private cursor = null;

    constructor() {
        super('TestScene');
    }


    preload() {
        this.load.image("stars", "assets/stars.jpg");
    }

    create() {
        this.cursor = this.input.keyboard.createCursorKeys();
        this.add.image(0, 0, 'stars');
    }

    update() {

    }

}