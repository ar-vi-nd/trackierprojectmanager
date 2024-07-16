import React from 'react';

const TaskCard = ({_id, taskName,taskDescription,dueDate,tags,taskStatus,handleUpdateTask, assignedUser,assignedTo ,project }) => {
    // console.log(assignedUser)
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 hover:scale-105 duration-200 hover:cursor-pointer">
      <h3 className="text-lg font-semibold">Task : {taskName}</h3>
      <p className="text-sm text-gray-500">Description : {taskDescription}</p>
      {project?.projectName&&<p className="text-sm text-gray-500">Project Name : {project?.projectName}</p>}
      {assignedTo&&<p className="text-sm text-gray-500">Assigned To : {assignedTo.toUpperCase()}</p>}
      <p className="text-sm text-gray-500">Due Date : {new Date(dueDate).toLocaleDateString()}</p>

      <span className={`inline-block px-2 py-1 text-xs font-semibold ${categoryColor(tags[0])}`}>
        {tags.length!==0?tags:"task"}
      </span>
      <div>

      <button className={`${taskStatus==="Backlog"?"bg-blue-400":""} text-white p-1 m-1 ${taskStatus==="In Progress"?"bg-red-500":""} ${taskStatus==="In Discussion"?"bg-green-400":""} ${taskStatus==="Done"?"hidden":""} hover:bg-pink-500 duration-200 rounded-md hover:scale-105`} onClick={()=>{handleUpdateTask(_id)}}>{taskStatus==="Backlog"?"Move to Discussion":taskStatus==="In Discussion"?"Move to Progress":taskStatus==="In Progress"?"Move to Done":""}</button>
      </div>
    </div>
  );
};

const categoryColor = (category) => {


  switch (category) {
    case 'Engineering':
      return 'text-blue-700 bg-blue-100';
    case 'Design':
      return 'text-green-700 bg-green-100';
    case 'Research':
      return 'text-purple-700 bg-purple-100';
    case 'Data Science':
      return 'text-pink-700 bg-pink-100';
    default:
      return 'text-gray-700 bg-gray-100';
  }
};

export default TaskCard;
