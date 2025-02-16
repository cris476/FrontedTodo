import api from "./axiosConfig";

export const getAllTasks = async () => {
  return await api.get("/tasks");
};

export const createTask = async (taskData) => {
  return await api.post("/tasks", taskData);
};

export const updateTask = async (taskId, taskData) => {
  return await api.put(`/tasks/${taskId}`, taskData);
};

export const deleteTask = async (taskId) => {
  return await api.delete(`/tasks/${taskId}`);
};
