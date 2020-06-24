import Events from "../events";
import { HealthBar } from "../objects/HealthBar";
import { HudObject, HudSceneInterface } from "../interfaces/Interfaces";

export default class HudScene extends Phaser.Scene implements HudSceneInterface{

    healthBar: HudObject;

    constructor() {
        super('GuiScene');
    }


    init(config: object) {
        // console.log("CONFIG", config);

        // //@ts-ignore
        // this.levelId = config.levelId;

    }


    preload() {

    }


    create() {

        this.healthBar = HealthBar();

        this.healthBar.create(this);

        // console.log("Target LEvel Id", this.levelId);

        // this.events.addListener('playerUpdate', (player) => {
        //     console.log("Player update", player);
        // });

    }


    update() {
        this.healthBar.update(this);
    }

}