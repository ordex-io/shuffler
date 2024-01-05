import seedrandom from 'seedrandom'; // Used to create a seeded random number generator
import 'dotenv/config'; // Used to load environment variables from a .env file
import fs from 'fs/promises'; // Used for file system operations like reading and writing files

// Shuffle function that shuffles an array of objects containing both value and original index
function shuffle<T>(input: T[], seed: string, firstItemIndex: number): { value: T, index: number }[] {
    // Convert each element in the input array into an object with value and original index
    const indexedInput = input.map((item, index) => ({ value: item, index }));

    if(firstItemIndex > (indexedInput.length - 1)) {
        throw new Error('FIRST_ITEM_INDEX is out of input collection bounds');
    }

    // Remove the selected first item from the input
    const selectedFirstItem = indexedInput.splice(firstItemIndex, 1)[0];

    // Initialize a random number generator with the seed
    let rng = seedrandom(seed);
    for (let i = indexedInput.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1)); // Random index from 0 to i
        [indexedInput[i], indexedInput[j]] = [indexedInput[j], indexedInput[i]]; // Swap elements in the array
    }

    // Finalize the result with selected first item, then append the shuffled result
    return [selectedFirstItem, ...indexedInput];
}

// The main function of the script, which runs the overall process
async function main() {
    try {
        // Check for required environment variables and throw an error if they are not set
        if (!process.env.INPUT_PATH || !process.env.SEED || !process.env.SHUFFLE_OUTPUT_PATH || !process.env.ORDER_OUTPUT_PATH || !process.env.FIRST_ITEM_INDEX) {
            throw new Error('One or more environment variables are not set.');
        }

        // Read the input file and parse it as JSON
        const inputString = await fs.readFile(process.env.INPUT_PATH, { encoding: 'utf-8' });
        const input = JSON.parse(inputString);
        if (!Array.isArray(input)) throw new Error('Input file does not contain a valid array.');

        // Parse the first item index as number
        const firstItemIndex = Number(process.env.FIRST_ITEM_INDEX);

        // Shuffle the input array and prepare the result
        const result = shuffle(input, process.env.SEED, firstItemIndex);

        // Save the shuffled array to the output file
        await fs.writeFile(process.env.SHUFFLE_OUTPUT_PATH, JSON.stringify(result.map(item => item.value)));
        console.log('Shuffling complete. Output saved to:', process.env.SHUFFLE_OUTPUT_PATH);

        // Extract the order of original indices and write it to a new file
        const orderOfOriginalIndices = result.map(item => item.index);
        await fs.writeFile(process.env.ORDER_OUTPUT_PATH, JSON.stringify(orderOfOriginalIndices));
        console.log('Order of original indices saved to:', process.env.ORDER_OUTPUT_PATH);

    } catch (error) {
        console.error('Error:', error.message); // Print any errors that occur
    }
}

main(); // Execute the main function
