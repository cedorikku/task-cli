#!/usr/bin/env node
import tasksHandler from './lib/tasksHandler.js';

const args = process.argv;
const ACTION_POS = 2;
const ACTIONS = {
    ADD: 'add',
    UPDATE: 'update',
    DELETE: 'delete',
    LIST: 'list',
    MARK_IN_PROGRESS: 'mark-in-progress',
    MARK_DONE: 'mark-done',
};

const action = args[ACTION_POS];

switch (action) {
    case ACTIONS.ADD: {
        if (args.length > 4) {
            console.log(`usage: ${ACTIONS.ADD} [DESCRIPTION]`);
            break;
        }
        tasksHandler.addTask(args[ACTION_POS + 1]);
        break;
    }
    case ACTIONS.UPDATE: {
        if (args.length > 5) {
            console.log(`usage: ${ACTIONS.UPDATE} [ID] [DESCRIPTION]`);
            break;
        }
        tasksHandler.updateTask(args[ACTION_POS + 1], args[ACTION_POS + 2]);
        break;
    }
    case ACTIONS.DELETE: {
        if (args.length > 4) {
            console.log(`usage: ${ACTIONS.DELETE} [ID]`);
            break;
        }
        tasksHandler.deleteTask(args[ACTION_POS + 1]);
        break;
    }
    case ACTIONS.LIST: {
        if (args.length > 4) {
            console.log(`usage: ${ACTIONS.LIST} [*STATUS]`);
            break;
        }
        tasksHandler.listTasks(args[ACTION_POS + 1]);
        break;
    }
    case ACTIONS.MARK_IN_PROGRESS:
    case ACTIONS.MARK_DONE: {
        if (args.length > 4) {
            console.log(`usage: ${action} [ID]`);
            break;
        }

        const id = args[ACTION_POS + 1];
        const statusMap = {
            'mark-in-progress': 'in-progress',
            'mark-done': 'done',
        };

        tasksHandler.markTask(id, statusMap[args[ACTION_POS]]);
        break;
    }
    default: {
        console.log(
            'Simple task management in the cli for everyday tasks.\n' +
                'usage: task-cli [ACTION]\n\nBelow are the available actions:',
        );
        Object.values(ACTIONS).forEach((a) => {
            console.log(`- ${a}`);
        });
    }
}
