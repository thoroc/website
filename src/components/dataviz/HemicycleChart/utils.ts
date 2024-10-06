/**
 * Generates a dataset which is an array of 2 number inside an array of 10 items.
 *
 * @param length The length of the dataset (default 10).
 * @returns An array of randomly generated data points.
 */
export const generateDataset = (length = 10): Number[][] =>
  Array(length)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);
