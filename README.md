# Collection Shuffler

This Node.js script provides a utility to shuffle an array from a JSON file using a seeded random generator. It ensures that the output is deterministic based on the seed provided, meaning that using the same seed and input file will always result in the same shuffled order.

## Features

- **Deterministic Shuffling**: Utilizes a seed value to ensure that the shuffling of the array is reproducible.
- **File I/O**: Reads an array from a specified JSON input file and writes the shuffled array back to a specified output file.
- **Exclusion of First Element**: The script is designed to exclude the first item of the array from shuffling, maintaining its position at the beginning of the array.

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
- `OUTPUT_PATH`: Path where the shuffled array will be saved.
- `SEED`: Seed string for the random number generator.

## Usage

To run the application, use the following command:

```bash
npm start
```
