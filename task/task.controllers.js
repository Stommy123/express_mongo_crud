import Task from './task.model';

// list the current user's task
const listTasks = async (req, res) => {
  const { currentUser } = req;

  // populates will replace the `task.user` property with
  // the associated user document
  const tasks = await Task.find({ user: currentUser._id }).populate('user');

  res.send({ tasks });
};

// create a task for the current user
const createTask = async (req, res) => {
  const { body, currentUser } = req;

  const newTask = new Task({ ...body, user: currentUser._id });

  await newTask.save();

  res.send({ task: newTask });
};

export default { listTasks, createTask };
