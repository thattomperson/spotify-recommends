jest.mock('../store');
const SongCard = require('../SongCard.svelte')

describe('SongCard', () => {
  it('Should Render Correctly', () => {
    // SongCard
    
    let tree = {
      node: 'test'
    }

    expect(tree).toMatchSnapshot()
  })
})