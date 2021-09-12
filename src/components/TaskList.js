import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';

export function PureTaskList({ loading, tasks, onPinTask, onArchiveTask }) {
    const events = {
        onPinTask,
        onArchiveTask,
    };

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );
    if (loading) {
        return (
            <div className="list-items">
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        );
    }
    if (tasks.length === 0) {
        return (
            <div className="list-items">
                <div className="wrapper-message">
                    <span className="icon-check" />
                    <div className="title-message">You have no tasks</div>
                    <div className="subtitle-message">Sit back and relax</div>
                </div>
            </div>
        );
    }

    // MRL: Very clever way to get all the Pinned-tasks at the top of the list
    const tasksInOrder = [
        ...tasks.filter(t => t.state === 'TASK_PINNED'),
        ...tasks.filter(t => t.state !== 'TASK_PINNED'),
    ];
    // MRL: Now use the tasksInOrder list to render the tasks in the new order
    return (
        <div className="list-items">
            {tasksInOrder.map(task => (
                <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    );
}

// MRL: Specify the "shape" of the expected date od this component, either using propTypes (as below) or by using TypeScript instead of Vanilla JS
PureTaskList.propTypes = {
    /** Checks if it's in loading state */
    loading: PropTypes.bool,
    /** The list of tasks */
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,      // MRL: Here is an example of re-using the propTypes of child-component (this component need to be imprted)
    /** Event to change the task to pinned */
    onPinTask: PropTypes.func.isRequired,
    /** Event to change the task to archived */
    onArchiveTask: PropTypes.func.isRequired,
};

PureTaskList.defaultProps = {
    loading: false,
};

export default connect(
    ({ tasks }) => ({
        tasks: tasks.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
    }),
    dispatch => ({
        onArchiveTask: id => dispatch(archiveTask(id)),
        onPinTask: id => dispatch(pinTask(id)),
    })
)(PureTaskList);
