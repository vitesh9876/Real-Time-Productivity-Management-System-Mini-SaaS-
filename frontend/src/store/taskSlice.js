import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = createAsyncThunk('tasks/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL, taskData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${API_URL}/${id}`, data, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`${API_URL}/${id}`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  reducers: {
    resetTasks: (state) => {
      state.tasks = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    // For socket real-time updates
    taskAdded: (state, action) => {
      if (!state.tasks.find(t => t._id === action.payload._id)) {
        state.tasks.push(action.payload);
      }
    },
    taskUpdated: (state, action) => {
      const index = state.tasks.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    taskDeleted: (state, action) => {
      state.tasks = state.tasks.filter(t => t._id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        if (!state.tasks.find(t => t._id === action.payload._id)) {
          state.tasks.push(action.payload);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        // Handled by socket
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        // Handled by socket
      });
  }
});

export const { resetTasks, taskAdded, taskUpdated, taskDeleted } = taskSlice.actions;
export default taskSlice.reducer;
