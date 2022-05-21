const axios = require('axios');
const Nylas = require('nylas');
require('dotenv').config();
const { default: Event } = require('nylas/lib/models/event');
const { f1Api, barAddress, arrivalEarlyDurationMins, tz, raceDurationMins } = require('../constants');

Nylas.config({clientId: process.env.NYLAS_CLIENT_ID, clientSecret: process.env.NYLAS_SECRET});
const nylas = Nylas.with(process.env.NYLAS_TOKEN);


async function createRaces(request){
    try{
        const {calendarId} = request.body;
    
        const raceSchedule = (await axios.get(f1Api)).data.MRData.RaceTable.Races;

        upcomingRaceSchedule = raceSchedule.filter((race) => Date.parse(race.date) > new Date().getTime())
        
        // console.log(upcomingRaceSchedule);
        //Create a test set of 5 to enable easy reset
        const sampleSchedule = upcomingRaceSchedule.slice(0, 5);
    
        const scheduleArray = sampleSchedule.map(async (race) => {
            const {raceName, date, time} = race;
    
            const event = new Event(nylas);
            event.calendarId = calendarId;
    
            event.title = raceName;
            event.location = barAddress;
            event.busy = true;
    
            const startTimeStamp = Date.parse(`${date}T${time}`)/1000;
    
            const preRaceSeconds = arrivalEarlyDurationMins * 60;
            const raceLengthSeconds = raceDurationMins * 60;
    
            event.when.startTime = startTimeStamp - preRaceSeconds;
            event.when.endTime = startTimeStamp + raceLengthSeconds;
            
            event.when.start_timezone = event.when.end_timezone = tz;
    
            return event.save();
        });
        const scheduleResults = await Promise.all(scheduleArray);
        // console.log(scheduleResults);
        console.log("Successly Created Events!");
    }
    catch(error){
        console.error("An error occured!");
    } 
}

async function deleteRaces(request){
    try{
        const {calendarId} = request.query;
        
        const eventsToDelete = (await nylas.events.list({calendar_id: calendarId, location: barAddress})).map((event) => {
            return event.id
        });
        console.log(eventsToDelete);
        
        const deleteEventPromise = eventsToDelete.map(async (eventId) => {
            return nylas.events.delete(eventId)
        });
        const deleteEventRes = await Promise.all(deleteEventPromise);
        // console.log(deleteEventRes);
        
        console.log("Successly Deleted Events!");
    }
    catch(error){
        console.error("An error occured!", error);
    } 
}


async function inviteUpcomingRaces(request){
    try{
        const {calendarId, newInviteEmail, newInviteName} = request.body;
        
        const updateEventsPromise = (await nylas.events.list({calendar_id: calendarId, location: barAddress, starts_after: new Date().getTime()})).map((event) => {
            event.participants = [...event.participants, {name: newInviteName, email: newInviteEmail}];
            event.save();
        });

        const updateEventRes = await Promise.all(updateEventsPromise);

        console.log(`Successly Invited ${newInviteName} (${newInviteEmail}) To Events!`);
    }
    catch(error){
        console.error("An error occured!", error);
    } 
}

module.exports = { createRaces, deleteRaces, inviteUpcomingRaces }