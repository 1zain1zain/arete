import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  const K_6: number = 6;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET root should 404)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  it('/roll (GET with HEADER k)', async () => {
    const testValues: Map<number, number> = new Map();
    testValues.set(K_6, 0.5454549817720328);
    const probabilities: number[] = Array.from(testValues.values());
    const expectedBody = { data: probabilities };

    const response = await request(app.getHttpServer())
        .get('/roll')
        .set('k', `${K_6}`) // 6 must be string
        .expect(200)
        .expect(expectedBody);

    expect(response.body).toStrictEqual(expectedBody);
    expect(response.body.data.length).toStrictEqual(1);
    console.log(response.body);
  });


  it('/roll (GET no HEADER)', async () => {
    const sixThruNinetyNine: number[] = Array.from({ length: 94 }, (_, i) => i + 6);

    const response = await request(app.getHttpServer())
        .get('/roll')
        .expect(200);

    expect(response.body.data.length).toStrictEqual(sixThruNinetyNine.length);
    console.log(response.body);
  });

  afterAll(async () => {
    await app.close();
  });
});
