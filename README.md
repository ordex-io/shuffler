# Collection Shuffler

This Node.js script offers a specialized utility for shuffling an array from a JSON file using a seeded random generator. The script ensures that the output is deterministic based on the provided seed, which means using the same seed and input will consistently yield the same shuffled order. Additionally, it customizes the final array order by placing the owner's item first, followed by a selected item, and then the remaining shuffled array. It also outputs the order of the original indices after shuffling.

## Features

- **Deterministic Shuffling**: Employs a seed value to ensure that the shuffling of the array is reproducible and consistent across runs.
- **Selective Ordering**: Retains the owner's item as the first element and a selected item as the second before shuffling the rest of the array.
- **File I/O**: Reads an array from a specified JSON input file and writes the re-ordered array back to a specified output file.
- **Order Output**: Outputs the order of the original indices after shuffling for reference or further processing.

## Requirements

- [Node.js](https://nodejs.org/en/download/)

## Installation

Perform the following command to install all necessary dependencies:

```bash
npm install
```

## Configuration

Copy the `.env.example` file to a new file named `.env` and configure the environment variables:

- `INPUT_PATH`: Path to the input JSON file containing the array.
- `SHUFFLE_OUTPUT_PATH`: Path where the shuffled array will be saved.
- `ORDER_OUTPUT_PATH`: Path where the sequence of original indices from the shuffled array will be saved.
- `SEED`: Seed string for the random number generator.
- `SEED`: Seed string for the random number generator.

## Usage

To run the application, use the following command:

```bash
npm start
```
