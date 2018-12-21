import scheduleCron from './cron';
import { fetchStories } from '../modules/stories';

export default () => {
  scheduleCron("*/30 * * * *", fetchStories);
  console.log(`cron registered`);
}