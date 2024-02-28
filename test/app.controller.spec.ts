import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';


describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get(AppController);
    appService = app.get(AppService);
  });

  describe('get all 94 probabilities', () => {
    it('should return all 94 probabilities"', () => {
      const sixThruNinetyNine: number[] = Array.from({ length: 94 }, (_, i) => i + 6);

      appController.getProbabilities()
          .then(actual => {
            expect(actual.data.length).toEqual(sixThruNinetyNine.length);
      });
    });
  });

  describe('get probability for K_6', () => {
    it('should return "0.5454549817720328"', async () => {
      const K_6: number = 6;
      const expectedValue = new Map<number, number>();
      expectedValue.set(K_6,  0.5454549817720328);
      const expected = Array.from(expectedValue.values()) ;
      const actual = await appController.getProbabilities(K_6);

      expect(actual.data).toEqual(expected);
      // console.log("expected =" , expected, ";", "actual =", actual.data);
    });
  });

});
