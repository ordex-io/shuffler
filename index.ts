import seedrandom from 'seedrandom';
import 'dotenv/config';
import fs from 'fs/promises';

function shuffle<T>(array: T[], seed: string): T[] {
    let result = [...array];
    let rng = seedrandom(seed);
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

async function main() {
    try {
        if (!process.env.INPUT_PATH) throw new Error('INPUT_PATH is not set in the environment variables');
        if (!process.env.SEED) throw new Error('SEED is not set in the environment variables');
        if (!process.env.OUTPUT_PATH) throw new Error('OUTPUT_PATH is not set in the environment variables');

        try {
            await fs.access(process.env.INPUT_PATH);
        } catch (error) {
            throw new Error('Input file does not exist or cannot be accessed.');
        }

        const inputString = await fs.readFile(process.env.INPUT_PATH, { encoding: 'utf-8' });
        const input = JSON.parse(inputString);

        if (!Array.isArray(input)) throw new Error('Input file does not contain a valid array.');

        const result = shuffle(input, process.env.SEED);
        await fs.writeFile(process.env.OUTPUT_PATH, JSON.stringify(result));
        console.log('Shuffling complete. Output saved to:', process.env.OUTPUT_PATH);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
