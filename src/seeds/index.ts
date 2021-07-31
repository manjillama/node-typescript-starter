/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/newline-after-import
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Lyric from '../models/lyric.model';
import { keys } from '../config';

const lyricsData = require('./lyrics.json');

mongoose.connect(keys.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Import data into database
const importData = async () => {
  try {
    const lyricsPromise = Lyric.create(lyricsData);
    await Promise.all([lyricsPromise]);
    console.log('✨ Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    console.log('✨ Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
