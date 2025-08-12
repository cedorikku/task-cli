#!/usr/bin/env node
import tasksHandler from './lib/tasksHandler.js';

const args = process.argv;
const ACTION_POS = 2;
const ACTIONS = {
    ADD: 'add',
    UPDATE: 'update',
    DELETE: 'delete',
    LIST: 'list',
};

switch (args[ACTION_POS]) {
    case ACTIONS.ADD: {
        if (args.length > 4) {
            console.log(`usage: ${ACTIONS.ADD} <"task_name">`);
            break;
        }
        tasksHandler.addTask(args[ACTION_POS + 1]);
        break;
    }
    case ACTIONS.UPDATE: {
        break;
    }
    case ACTIONS.DELETE: {
        break;
    }
    case ACTIONS.LIST: {
        // get all
        break;
    }
    default: {
        console.log('usage: ');
        Object.values(ACTIONS).forEach((a) => {
            console.log(`    ${a}`);
        });
    }
}
