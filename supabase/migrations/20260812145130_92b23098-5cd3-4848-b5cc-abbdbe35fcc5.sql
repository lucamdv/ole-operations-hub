SELECT cron.unschedule(jobid) FROM cron.job WHERE jobname = 'calendar-reminders-tick';
