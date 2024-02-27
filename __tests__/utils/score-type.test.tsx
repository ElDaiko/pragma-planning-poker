// Importa tus dependencias necesarias y el objeto typesOfScores
import { typesOfScores } from "@/utils/score-type";

describe('typesOfScores', () => {
  it('Should have "power-of-two" with the correct values', () => {
    expect(typesOfScores['power-of-two']).toEqual([
      "1", "2", "4", "8", "16", "32", "64", "128", "❓", "☕"
    ]);
  });

  it('Should have "fibonacci" with the correct values', () => {
    expect(typesOfScores['fibonacci']).toEqual([
      "0", "1", "3", "5", "8", "13", "21", "34", "55", "89", "❓", "☕"
    ]);
  });

  it('Should have "lineal" with the correct values', () => {
    expect(typesOfScores['lineal']).toEqual([
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "❓", "☕"
    ]);
  });
});