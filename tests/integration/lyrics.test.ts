import request from 'supertest';
import Lyric from '../../src/models/lyricModel';
import app from '../../src/app';

interface ILyric {
  song: string;
  lyrics: string;
}

afterEach(async () => {
  await Lyric.deleteMany({
    song: ['_test_ Smelly cat', '_test_ Kurt robin'],
  });
});

describe('GET /', () => {
  it('should return all genres', async () => {
    await Lyric.insertMany([
      { song: '_test_ Smelly cat', lyrics: 'Bla bla bla' },
      { song: '_test_ Kurt robin', lyrics: 'Bla bla bla' },
    ]);

    const res: any = await request(app).get('/api/lyrics');
    expect(res.statusCode).toBe(200);
    // expect(res.body.data.length).toBe(2);
    expect(res.body.data.some((l: ILyric) => l.song === '_test_ Smelly cat'));
    expect(res.body.data.some((l: ILyric) => l.song === '_test_ Kurt robin'));
  });
});
