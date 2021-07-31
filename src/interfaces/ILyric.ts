import { Document } from 'mongoose';

export interface ILyricType {
  song: string;
  lyrics: string;
  artist?: string;
  album?: string;
}
export default interface ILyric extends Document, ILyricType {}
