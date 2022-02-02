import { Beach } from '@src/models/beach';




describe('Beaches functional test', () => {
  beforeAll(async () => await Beach.deleteMany({})); //Deleta todas as praias que estão no banco de dados, garantindo que o clean state do test qaundo rodar;
  describe('When create a beach', () => {
    it('Should create a beach with success', async () => {
      const newBeach = {
        name: 'Manly',
        position: 'E',
        lat: -33.792726,
        lng: 151.289824,
      };

      const response = await global.testRequest.post('/beaches').send(newBeach);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newBeach));
      // Para o expect.objectContaining() basta que tenha essas chaves do newBeache dentro do objeto, mesmo tendo outras chaves dentro
      // do objeto como o Id que é dinamico;
    });

    it('should return 422 when there is a validation Error', async () => {
      const newBeach = {
        name: 'Manly',
        position: 'E',
        lat: 'invalid_string',
        lng: 151.289824,
      }

      const response = await global.testRequest.post('/beaches').send(newBeach);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'Beach validation failed: lat: Cast to Number failed for value "invalid_string" (type string) at path "lat"'
      });
    });

    it.skip('Should return 500 when there is any error other than validation error', async () => {
      //Todo;
    });
  });
});
