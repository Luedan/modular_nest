import { HttpAdapter } from '@app/modules/common/adapters/httpAdapter.service';
import { GetPokemonByName } from '@app/modules/example/infrastructure/external/pokeApi/getPokemonByName.service';
import { It, Mock } from 'moq.ts';

const PokeMock = {
  id: 1,
  name: 'Pikachu',
};

describe('getPokemonByName', () => {
  let getPokemonByName: GetPokemonByName;

  // Mocks
  const httpAdapterMock = new Mock<HttpAdapter>()
    .setup((i) => i.initialize(It.IsAny()))
    .returns();

  beforeEach(() => {
    getPokemonByName = new GetPokemonByName(httpAdapterMock.object());
  });

  it('Should return a pokemon by name', async () => {
    // Arrange
    httpAdapterMock
      .setup((i) => i.get(It.IsAny()))
      .returns(Promise.resolve(PokeMock));

    // Act
    const result = await getPokemonByName.execute(It.IsAny());

    // Assert
    expect(result).toEqual(PokeMock);
  });
});
