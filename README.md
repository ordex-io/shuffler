# Array Shuffler

This Node.js script provides a utility to shuffle an array from a JSON file using a seeded random generator. It ensures that the output is deterministic based on the seed provided.

## Features

- Shuffles an array deterministically using a seed value.
- Reads input from a file and writes the shuffled array to an output file.

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
