import SongCard from '../SongCard.svelte'

jest.mock('axios')

describe('SongCard', () => {
  it('Should Render Correctly', () => {
    // SongCard
    
    let tree = {
      node: 'test'
    }

    expect(tree).toMatchSnapshot()
  })
})