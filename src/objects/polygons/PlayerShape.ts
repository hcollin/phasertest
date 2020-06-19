


interface PlayerShape {
    points: string;
    acceleration: number;
    rotationSpeed: number;
    cameraSpeed: number;
    color: number;
    name?: string;
};


const shapeOne: PlayerShape = {
    points: `0, 0, 40, 0, 40, 40, 80, 40, 80, 80, 40, 80, 40, 120, 0, 120, 0, 0`,
    acceleration: 5,
    rotationSpeed: 0.1,
    cameraSpeed: 1,
    color: 0x00FF00,
}

const shapeTwo: PlayerShape = {
    points: `0, 0, 40, 0, 40, 200, 0, 200, 0, 0`,
    acceleration: 5,
    rotationSpeed: 0.1,
    cameraSpeed: 1,
    color: 0x00FF00,
}

const shapeThree: PlayerShape = {
    points: `0, 0, 80, 0, 80, 40, 120, 40, 120, 80, 40, 80, 40, 40, 0, 40, 0, 0`,
    acceleration: 5,
    rotationSpeed: 0.1,
    cameraSpeed: 1,
    color: 0x00FF00,
}

function createPlayerShape(scene: Phaser.Scene, pshape: PlayerShape, x: number, y: number): Phaser.Types.Physics.Matter.MatterBody {
    
    const shape = scene.add.polygon(x, y, pshape.points, pshape.color);

    const obj = scene.matter.add.gameObject(shape, { shape: { type: 'fromVerts', verts: pshape.points, flagInternal: true } });

    return obj;
}

export {
    PlayerShape,
    createPlayerShape,
    shapeOne,
    shapeTwo,
    shapeThree
}