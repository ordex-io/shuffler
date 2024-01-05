// Import necessary modules and libraries
import seedrandom from 'seedrandom'; // Used to create a random number generator
import 'dotenv/config'; // Used to load environment variables from a .env file
import fs from 'fs/promises'; // Used for file system operations, like reading and writing files

// This is a function that shuffles the given array using a seed value.
// The seed ensures that the shuffle can be reproduced if needed.
function shuffle<T>(array: T[], seed: string): T[] {
    let result = [...array]; // Creates a copy of the original array
    let rng = seedrandom(seed); // Initializes a random number generator with the seed
    // Loop to shuffle the array
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]]; // Swap elements in the array
    }
    return result; // Return the shuffled array
}

// The main function of the script, which runs the overall process.
async function main() {
    try {
        // Check for required environment variables and throw an error if they are not set.
        if (!process.env.INPUT_PATH) throw new Error('INPUT_PATH is not set in the environment variables');
        if (!process.env.SEED) throw new Error('SEED is not set in the environment variables');
        if (!process.env.OUTPUT_PATH) throw new Error('OUTPUT_PATH is not set in the environment variables');

        // Check if the input file exists and can be accessed
        try {
            await fs.access(process.env.INPUT_PATH);
        } catch (error) {
            throw new Error('Input file does not exist or cannot be accessed.');
        }

        // Read the input file and parse it as JSON.
        const inputString = await fs.readFile(process.env.INPUT_PATH, { encoding: 'utf-8' });
        const input = JSON.parse(inputString);

        // Ensure the input file contains a valid array.
        if (!Array.isArray(input)) throw new Error('Input file does not contain a valid array.');

        // Shuffle the input array, excluding the first item.
        const shuffledInput = input.slice(1,)
        const result = shuffle(shuffledInput, process.env.SEED);

        // Save the shuffled array to the output file.
        await fs.writeFile(process.env.OUTPUT_PATH, JSON.stringify(result));
        console.log('Shuffling complete. Output saved to:', process.env.OUTPUT_PATH);

    } catch (error) {
        // If any error occurs during the process, print the error message.
        console.error('Error:', error.message);
    }
}

// Execute the main function.
main();
