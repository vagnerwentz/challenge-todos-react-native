import React, { useState } from 'react';
import { Alert } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string): void {
    if (newTaskTitle === '') {
      Alert.alert('O campo está vazio, preencha.');
      return;
    }
    const dataOfTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, dataOfTask]);
  }

  function handleMarkTaskAsDone(id: number): void {
    const filteredTasks = tasks.find((task) => task.id === id);
    if (filteredTasks) {
      filteredTasks.done = !filteredTasks.done;
      const listOfTasksAfterMarkAsDone = [...new Set([filteredTasks, ...tasks])];
      setTasks(listOfTasksAfterMarkAsDone);
    }
  }

  function handleRemoveTask(id: number): void {
    setTasks(oldState => oldState.filter((task) => task.id !== id));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  )
}