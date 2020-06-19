import "phaser";

export default function ShapeThree(scene: Phaser.Scene, x: number, y: number): Phaser.Types.Physics.Matter.MatterBody {

    const coords = `0, 0, 80, 0, 80, 40, 120, 40, 120, 80, 40, 80, 40, 40, 0, 40, 0, 0`;

    const shape = scene.add.polygon(x, y, coords, 0xff88422);

    const obj = scene.matter.add.gameObject(shape, { shape: { type: 'fromVerts', verts: coords, flagInternal: true } });

    return obj;
}
