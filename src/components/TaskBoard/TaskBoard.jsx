import React,{useState} from 'react';
import {TaskCard} from '../index';


const TaskBoard= ({tasks,handleUpdateTask}) => {

    return (
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Column title="Backlog" tasks={tasks?.backlog} handleUpdateTask={handleUpdateTask} />
            <Column title="In Discussion" tasks={tasks?.inDiscussion} handleUpdateTask={handleUpdateTask} />
            <Column title="In Progress" tasks={tasks?.inProgress} handleUpdateTask={handleUpdateTask} />
            <Column title="Done" tasks={tasks?.done} handleUpdateTask={handleUpdateTask} />
          </div>
      );
    };

const Column = ({title , tasks , handleUpdateTask }) => (
  <div className="bg-gray-100 p-4 rounded-md">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {tasks?.length===0?"No tasks yet":tasks?.map((task, index) => (
      <TaskCard handleUpdateTask={handleUpdateTask} key={index} {...task} />
    ))}
  </div>
);

export default TaskBoard;
