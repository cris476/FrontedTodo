import api from "./axiosConfig";


// Obtenemos todas las tareas
export const getAllTasks = async () => {
  return await api.get("/tasks");
};


// Obtenemos una tarea por su id
export const createTask = async (taskData) => {
  return await api.post("/tasks", taskData);
};

// Obtenemos una tarea por su id
export const updateTask = async (taskId, taskData) => {
  return await api.put(`/tasks/${taskId}`, taskData);
};

// Obtenemos una tarea por su id
export const deleteTask = async (taskId) => {
  return await api.delete(`/tasks/${taskId}`);
};
