import * as express from "express";
import {QueryError, RowDataPacket} from 'mysql2';

export const pingController = express.Router();

const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
    user: 'birdie',
    password: '7VsGDAXfpEH7Bee',
    database: 'birdietest',
});

pingController.get('/hello', (_, res) => {
  pool.query(
    'SELECT payload FROM events WHERE visit_id = ?',
    [''],
    function (_err: QueryError, results: RowDataPacket[]) {
      res.status(200).json({
        result: results
      });
    }
  ); 
  /*pool.query(
    'SELECT DISTINCT event_type FROM events',
    ['physical_health_observation'],
    function (_err: QueryError, results: RowDataPacket[]) {
      res.status(200).json({
        result: results
      });
    }
  ); 
  */
  /*
  pool.query(
    'SELECT payload FROM events WHERE event_type = ?',
    ['physical_health_observation'],
    function (_err: QueryError, results: RowDataPacket[]) {
      res.status(200).json({
        result: results
      });
    }
  ); 
  */
});


pingController.get('/care-recipients', (_, res) => {
  pool.query(
    'SELECT DISTINCT care_recipient_id FROM events',
    function (_err: QueryError, results: RowDataPacket[]) {
      res.status(200).json(results);
    }
  );
});

pingController.get('/mood/:id', (req, res) => {
  pool.query(
    'SELECT timestamp, payload FROM events WHERE event_type = ? AND care_recipient_id = ?',
    ['mood_observation', req.params.id],
    function (_err: QueryError, results: RowDataPacket[]) {
      const moodArray: Array<{timestamp: string; mood: number;}> = [];
      results.forEach((result: RowDataPacket) => {
        var mood: number = 0;
        switch (result.payload.mood) {
          case 'sad': mood = -1; break;
          case 'happy': mood = 1; break;
        }
        moodArray.push({
          timestamp: result.timestamp,
          mood: mood,
        })
      });
      res.status(200).json(moodArray);
    }
  );
});

pingController.get('/task-completed/:id', (req, res) => {
  pool.query(
    'SELECT timestamp, payload FROM events WHERE event_type = ? AND care_recipient_id = ?',
    ['task_completed', req.params.id],
    function (_err: QueryError, results: RowDataPacket[]) {
      const taskArray: Array<{timestamp: string; note: string; description: string;}> = [];
      results.forEach((result: RowDataPacket) => {
        console.log(result.payload);
        taskArray.push({
          timestamp: result.timestamp,
          note: result.payload.task_schedule_note,
          description: result.payload.task_definition_description,
        });
      });
      res.status(200).json(taskArray);
    }
  )
})

pingController.get('/general-observation/:id', (req, res) => {
  pool.query(
    'SELECT timestamp, payload FROM events WHERE event_type = ? AND care_recipient_id = ?',
    ['general_observation', req.params.id],
    function (_err: QueryError, results: RowDataPacket[]) {
      const taskArray: Array<{timestamp: string; note: string;}> = [];
      results.forEach((result: RowDataPacket) => {
        console.log(result.payload);
        taskArray.push({
          timestamp: result.timestamp,
          note: result.payload.note,
        });
      });
      res.status(200).json(taskArray);
    }
  )
})

