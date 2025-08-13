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
 * Updates a task description via its unique id.
 * @param {Number} id - The task-to-be-updated's id.
 * @param {string} description - The new description for the task.
 */
export function updateTask(id, description) {
    const usageMessage = `usage: ${updateTask.name} <id> <"task_name">`;

    if (!id || !description) {
        return console.log(usageMessage);
    }

    if (description.trim().length === 0) {
        return console.log('Task name cannot be empty.\n\t' + usageMessage);
    }

    const _id = Number.parseInt(id);
    if (isNaN(_id)) {
        return console.log('Id is not a valid number.\n\t' + usageMessage);
    }

    const fileExists = fs.existsSync(FILEPATH);
    if (!fileExists)
        return console.log(
            `Missing file: '${FILEPATH}'. Try adding a task first.`,
        );

    const jsonData = fs.readFileSync(FILEPATH);
    const parsedJsonData = JSON.parse(jsonData);

    if (parsedJsonData.length === 0)
        return console.log(`Task ${_id} does not exist.`);

    let found = false;
    for (let task of parsedJsonData) {
        if (task.id === _id) {
            task.description = description;
            task.updatedAt = Date.now();
            found = true;
            break;
        }
    }
    if (!found)
        return console.log(`Task (ID: ${_id}) was not found, no task updated.`);

    try {
        fs.writeFileSync(FILEPATH, JSON.stringify(parsedJsonData), {
            encoding: 'utf8',
        });
        console.log(`Task updated successfully (ID: ${_id})`);
    } catch (err) {
        console.error(
            'Something went wrong with updating a task.',
            err.message,
        );
    }
}

/**
 * Deletes a task via its unique id.
 * @param {Number} id - The task-to-be-deleted's id.
 */
export function deleteTask(id) {
    const usageMessage = `usage: delete <id>`;

    if (!id) {
        return console.log(usageMessage);
    }

    const _id = Number.parseInt(id);
    if (isNaN(_id)) {
        return console.log(
            'The provided id is not a valid number.\n\t' + usageMessage,
        );
    }

    const fileExists = fs.existsSync(FILEPATH);
    if (!fileExists)
        return console.log(
            `Missing file: '${FILEPATH}'. Try adding a task first.`,
        );

    const jsonData = fs.readFileSync(FILEPATH);
    const parsedJsonData = JSON.parse(jsonData);

    if (parsedJsonData.length === 0)
        return console.log(
            `There are currently no running tasks at the moment.`,
        );

    const foundTask = parsedJsonData.find((task) => task.id === _id);
    if (!foundTask) {
        return console.log(
            `Task (ID: ${_id}) does not exist, no task deleted.`,
        );
    }

    const filtered = parsedJsonData.filter((task) => task.id !== _id);

    try {
        fs.writeFileSync(FILEPATH, JSON.stringify(filtered), {
            encoding: 'utf8',
        });
        console.log(`Task deleted successfully (previously ID: ${_id})`);
    } catch (err) {
        console.error(
            'Something went wrong with deleting a task.',
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

export default { addTask, updateTask, deleteTask };
