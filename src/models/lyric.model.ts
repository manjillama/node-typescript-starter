import mongoose from 'mongoose';
import ILyric from '../interfaces/ILyric';

const lyricSchema = new mongoose.Schema({
  song: {
    type: String,
    required: [true, 'Song name is required']
  },
  lyrics: {
    type: String,
    required: [true, 'Lyrics is required']
  },
  artist: {
    type: String,
    default: 'Unknown artist'
  },
  album: {
    type: String,
    default: 'Unknown album'
  }
});

const Lyric = mongoose.model<ILyric>('Lyric', lyricSchema);

export default Lyric;
