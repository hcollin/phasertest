
export function arrayToPhaserPoints(numbers: number[]): Phaser.Geom.Point[] {
    const arr: Phaser.Geom.Point[] = [];

    for (let i = 0; i < numbers.length; i += 2) {
        const p = new Phaser.Geom.Point(numbers[i], numbers[i + 1]);
        arr.push(p);
    }

    return arr;
}
