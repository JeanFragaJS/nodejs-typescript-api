//test de integração
import { Beach, BeachPosition } from '@src/models/beach';
import nock from 'nock';
import StormGlassWeather3HoursFixture from '@test/fixtures/stormGlass_weather_3_hours.json';
import ApiForecastResponse1BeachFixture from '@test/fixtures/api_forecast_response_1_beach.json';
import { User } from '@src/models/users';
import AuthServices from '@src/services/auth';

describe('Beach forecast fucntional', () => {
  const defaultUser = {
    name: "Saturno",
    email: "saturno@gmail",
    password: "saturno25"
  }

  let token: string;

  beforeEach(async () => {
    await Beach.deleteMany({});
    await User.deleteMany({});
    const user = await new User(defaultUser).save();
    const defaultBeach = {
      lat: -33.792726,
      lng: 151.289824,
      name: 'Manly',
      position: BeachPosition.E,
      user: user.id
    };
    token = AuthServices.generateToken(user.toJSON());
    new Beach(defaultBeach).save();
    // O usuário deve ser em  
    // json para que seja um objeto
  });

  it('should return a forecast with just a few times', async () => {
    /*** Nock ***/
    nock('https://api.stormglass.io:443', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true,
      },
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v2/weather/point')
      .query({
        lat: -33.792726,
        lng: 151.289824,
        params: /(.*)/,
        source: 'noaa',
      })
      .reply(200, StormGlassWeather3HoursFixture);

    const { body, status } = await global
      .testRequest
      .get('/forecast')
      .set({'x-access-token': token});
    
    expect(status).toBe(200);
    // Certifique-se de usar toEqual
    // para verificar o valor e não o
    // objeto e o próprio array
    expect(body).toEqual(ApiForecastResponse1BeachFixture);
  });

  it('Should return 500 if something goes wrong during the processing', async () => {
    nock('https://api.stormglass.io:443', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true,
      },
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v2/weather/point')
      .query({ lat: -33.792726, lng: 151.289824 })
      .replyWithError('Something went wrong');

    const { status } = await global
      .testRequest
      .get('/forecast')
      .set({'x-access-token': token })
    expect(status).toBe(500);
  });
});
