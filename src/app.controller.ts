import {BadRequestException, Body, Controller, Get, Headers, Query, Req, Res} from '@nestjs/common';
import {Response} from "express";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/roll")
  async getProbabilities(@Headers('k') k?: number): Promise<{data: number[]}> {

    // Here we simply look at k in the request header or default to 94 valid values of k (ranging from 6 through 99).

    // TODO: Question: What should happen when we get an unexpected GET request with a Body included?
    // Here we simply ignore the request body regardless whether it's included or not.
    // TODO: Must we reject the request altogether? Or do we take an alternate action?

    // ks is number array.
    // ks contains either a single valid value of k (between 1 and 199),
    // or 94 valid values of k (between 6 and 99).
    let ks: number[];
    const sixThruNinetyNine: number[] = Array.from({ length: 94 }, (_, i) => i + 6);

    // do the sensible validation checks.
    if (
        k !== undefined &&
        k !== null &&
        /^[0-9]+$/.test(k.toString()) && // Check if k contains only numeric characters
        parseInt(k.toString(), 10) > 0 && // Check if k is larger than 0
        parseInt(k.toString(), 10) < 199 // Check if k is smaller than 199 to keep the call stack low.
    ) {
      ks = [parseInt(k.toString(), 10)]; // Convert k to number and create an array with it
    } else {
      ks = sixThruNinetyNine; // Use the default array if k is undefined, null, contains non-numeric characters, or is not within the specified range
    }

    // call service to calculate probabilities
    const probabilities = await this.appService.calculateProbabilities(ks);

    // extract probability map values into array
    const valueArr = Array.from(probabilities.values());
    console.log(probabilities);
    // console.log(`ks=${ks}\n`+ valueArr.join('\n'));

    // send array as JSON object with data as key
    return { data: valueArr };
  }

}
