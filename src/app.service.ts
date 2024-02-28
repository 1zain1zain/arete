import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async calculateProbabilities(ks: number[]): Promise<Map<number, number>> {
    const probabilities: Map<number, number> = new Map();

    // calc a probability for each k and stuff it into a map with k as the map key
    for (const k of ks) {
      const probability = this.calculateProbability(k);
      probabilities.set(k, probability);
    }

    // return the map
    return probabilities;
  }

  private calculateProbability(k: number): number {
    // delegate to the helper method that internally will recurse up to a specified condition
    return this.calculateProbabilityHelper(k, 1.0 / k, 1.0 - 1.0 / k);
  }

  private calculateProbabilityHelper(k: number, probability: number, notWinning: number,): number {
    // add Bob's probability of winning a roll and Alice's probability of not winning a roll
    let nextProbability = 1.0 / k + notWinning * (1.0 - probability);

    // just recursion kill switch, return when their difference is extremely miniscule
    if (Math.abs(probability - nextProbability) < 1e-6) {
      return nextProbability;
    }

    // call recursively for the next roll
    return this.calculateProbabilityHelper(k, nextProbability, notWinning);
  }
}
