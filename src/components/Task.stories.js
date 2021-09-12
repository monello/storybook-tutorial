import React from 'react';

import Task from './Task';

// MRL: Tell Storybook abou the component we a documenting.
// MRL: component -- the component itself
// MRL: title -- how to refer to the component in the sidebar of the Storybook app
export default {
    component: Task,
    title: 'Task',
};

// MRL: Stories are defined by functions that return a rendered component, given different props for each story (state)

// MRL: We create a "Template" function that we can re-use for each story.
// MRL: This helps us type less code as we don't need new functions for each story, we can re-use the Template function for each story by implementing the JS .bind() function to make copies if this Template Function
const Template = args => <Task {...args} />;

// MRL: STORY 1 - The Default State
// MRL: This is whwre we use .bind() to make a "new" function (copy of the Template function instance)
export const Default = Template.bind({});
// MRL: Here we set the args (props) for this instance of the function (story / state). In other words, the props that the component src/components/Task.js take
Default.args = {
    task: {
        id: '1',
        title: 'Test Task',
        state: 'TASK_INBOX',
        updatedAt: new Date(2021, 0, 1, 9, 0), // MRL: updatedAt Seems to be a prop we can set that is used by StoryBook?? The Task component.task does not expect this prop ...
    },
};

// MRL: STORY 2 - State with an example Pinned-task
export const Pinned = Template.bind({});
Pinned.args = {
    task: {
        ...Default.args.task,       // MRL: Re-use the same properties as for the Default-state, using the spread-operator
        state: 'TASK_PINNED',       // MRL: override the state propery (agrument)
    },
};

// MRL: STORY 3 - State with an example archived task
export const Archived = Template.bind({});
Archived.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_ARCHIVED',
    },
};
