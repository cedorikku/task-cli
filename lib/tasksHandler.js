import os from 'os';
import fs from 'node:fs';
import { resolve } from 'node:path';

const HOME_DIR = os.homedir();
const FILENAME = 'tasks.json';
const FILEPATH = resolve(HOME_DIR, FILENAME);

/**
 * Adds a task to a JSON file with its own unique id.
 * @param {string} description - The task's description.
 */
export function addTask(description) {
    const usageMessage = `usage: ${addTask.name} <"task_name">`;
    if (!description) return console.log(usageMessage);
    if (description.trim().length === 0)
        return console.log('Task name cannot be empty.\n\t' + usageMessage);

    let tasks = [];
    let newTask;

    // Just create the file with json data if it doesn't exist exist.
    const fileExists = fs.existsSync(FILEPATH);
    if (!fileExists) {
        newTask = {
            id: 1,
            description: description,
            status: 'todo',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        tasks.push(newTask);
    } else {
        // Read and extract the data of the json file if it exists.
        try {
            const jsonData = fs.readFileSync(FILEPATH);
            const parsedJsonData = JSON.parse(jsonData);
            tasks = parsedJsonData;

            const nextId = getNextId(parsedJsonData);
            newTask = {
                id: nextId,
                description: description,
                status: 'todo',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };

            tasks.push(newTask);
        } catch (err) {
            console.error(
                `Something went wrong reading your file ${FILEPATH}`,
                err.message,
            );
        }
    }

    try {
        fs.writeFileSync(FILEPATH, JSON.stringify(tasks), {
            encoding: 'utf8',
        });

        console.log(`Task added successfully (ID: ${newTask.id})`);
    } catch (err) {
        console.error(
            'Something went wrong with adding the new task.',
            err.message,
        );
    }
}

/**
 * Returns the next highest number of the list object's ids.
 * @param {Object[]} list - Task list
 */
function getNextId(list) {
    if (list.length === 0) return 1;

    return (
        Math.max(
            ...list.map((item) => {
                return item.id;
            }),
        ) + 1
    );
}

export default { addTask };
