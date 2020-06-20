

interface PlayerShape {
    points: string;
    blocks: [number, number][];
    size: [number, number];
    acceleration: number;
    rotationSpeed: number;
    cameraSpeed: number;
    color: number;
    name?: string;
};


const shapeOne: PlayerShape = {
    points: `0, 0, 40, 0, 40, 40, 80, 40, 80, 80, 40, 80, 40, 120, 0, 120, 0, 0`,
    blocks: [[-30,-60], [-30, -20], [10, -20], [-30, 20]],
    size: [80, 120],
    acceleration: 5,
    rotationSpeed: 0.1,
    cameraSpeed: 2,
    color: 0x448844,
}

const shapeTwo: PlayerShape = {
    points: `0, 0, 40, 0, 40, 200, 0, 200, 0, 0`,
    blocks: [[0,0], [40, 0], [80, 0], [120, 0], [160, 0]],
    size: [200, 40],
    acceleration: 8,
    rotationSpeed: 0.025,
    cameraSpeed: 1,
    color: 0x00AA88,
}

const shapeThree: PlayerShape = {
    points: `0, 0, 80, 0, 80, 40, 120, 40, 120, 80, 40, 80, 40, 40, 0, 40, 0, 0`,
    blocks: [[0,0], [40, 0], [40, 40], [80, 40]],
    size: [120, 80],
    acceleration: 2,
    rotationSpeed: 0.2,
    cameraSpeed: 1,
    color: 0x88AA00,
}


function createPlayerShape(scene: Phaser.Scene, pshape: PlayerShape, x: number, y: number): Phaser.Types.Physics.Matter.MatterBody {
    
    // const shape = scene.add.polygon(x, y, pshape.points, pshape.color);
    const ps: Phaser.Geom.Point[] = pshape.points.split(",").reduce((ps: Phaser.Geom.Point[], p: string, i: number, arr: string[]) => {
        if(i % 2 === 0)  {
            const x = Number(arr[i - 1]);
            const y = Number(arr[i]);
            const p = new Phaser.Geom.Point(x, y);
            ps.push(p);
        }
        return ps;
    }, [] as Phaser.Geom.Point[]);
    const sh = new Phaser.Geom.Polygon(ps);
    const container: Phaser.GameObjects.Container = scene.add.container(x, y);

    

    

    pshape.blocks.forEach((bl: [number, number]) => {
        const b = scene.add.image(bl[0], bl[1], "PlayerBlock").setOrigin(0,0).setDisplayOrigin(0,0);
        container.add(b);
    });

    container.setSize(pshape.size[0], pshape.size[1])
    console.log(container);


    const obj: Phaser.Types.Physics.Matter.MatterBody  = scene.matter.add.gameObject(container);
    
    
    
    return obj;
}

export {
    PlayerShape,
    createPlayerShape,
    shapeOne,
    shapeTwo,
    shapeThree
}