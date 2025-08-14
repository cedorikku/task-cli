## About

Simple task management in the cli for everyday tasks. Sample solution for the challenge [task-tracker](https://roadmap.sh/projects/task-tracker).

### Why?

This mini-project was built to reinforce my knowledge in Node.js and fiddling around with its capabilities with the file system.

## Requirements

- node and npm

## Installation (Optional) and Uninstallation

Clone the project

```sh
git clone https://github.com/cedorikku/task-cli.git
cd task-cli
```

Install as bin

```sh
# ../task-cli/
npm install -g
```

Uninstall with

```sh
# ../task-cli/
npm uninstall

```

### Usage

> [!NOTE]
> This project creates a 'tasks.json' file in the your home directory. If it's windows it should be placed in your `%userprofile%` directory, if it's linux or macos it should be placed in your `$HOME` directory.

If installed, run with

```sh
task-cli [ACTION]
```

or if it isn't installed, run with node

```sh
# ../task-cli
node index.js [ACTION]

```

#### Example usage:

```sh
# Adding a new task
task-cli add "Buy groceries"

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```
