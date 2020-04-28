
import { Db } from "mongodb";
import Agenda from "agenda";

import { WelfareChecksService, StatsService } from ".";

let agenda: Agenda;

const AGENDA_JOBS = Object.freeze({
    PROCESS_WELFARE_CHECKS: "process welfare checks",
    RESET_DAILY_STATS: "reset daily stats"
});

const AGENDA_JOBS_INTERVAL = Object.freeze({
    [AGENDA_JOBS.PROCESS_WELFARE_CHECKS]: "0 8 * * *", // every day at 8AM
    // [AGENDA_JOBS.PROCESS_WELFARE_CHECKS]: "*/1 * * * *",
    [AGENDA_JOBS.RESET_DAILY_STATS]: "0 0 * * *" // every day at midnight
});

export async function initAgenda(db: Db) {
    agenda = new Agenda({
        mongo: db
    });
    defineAgendaJobs();
    await startAgendaJobs();
}

function defineAgendaJobs() {
    agenda.define(AGENDA_JOBS.PROCESS_WELFARE_CHECKS, async (job: Agenda.Job) => {
        console.log("Processing today's welfare checks...");
        await WelfareChecksService.processTodayWelfareChecks();
    });

    agenda.define(AGENDA_JOBS.RESET_DAILY_STATS, async (job: Agenda.Job) => {
        console.log("Resetting daily stats...");
        await StatsService.resetDailyStats();
    });
}

async function startAgendaJobs() {
    await agenda.start();

    await Promise.all(
        Object.entries(AGENDA_JOBS_INTERVAL).map(([jobName, interval]) => agenda.every(interval, jobName))
    );
}
