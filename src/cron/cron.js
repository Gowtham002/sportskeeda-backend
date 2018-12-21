import cron from 'node-cron';

export default (timing, callback) => {
  if(cron.validate(timing) && typeof callback === "function")
    return cron.schedule(timing, callback);
  else
    throw new Error("params mismatch");
}