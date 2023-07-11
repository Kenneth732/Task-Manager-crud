// Add event listener to the form submission
document.querySelector('#task-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get the input values
    const titleInput = document.querySelector('#titleInput').value;
    const descriptionInput = document.querySelector('#descriptionInput').value;
    const dueDateInput = document.querySelector('#dueDateInput').value;
  
    // Create a new task object
    const newTask = {
      title: titleInput,
      description: descriptionInput,
      dueDate: dueDateInput,
      completed: false
    };
  
    // Call the handlePostRequest function to send the POST request
    handlePostRequest(newTask);
  });
  
  // Function to handle rendering the fetched data
  const handleDisplay = (data) => {
    const taskList = document.querySelector('#task-list');
  
    // Clear any existing content
    taskList.innerHTML = '';
  
    // Iterate over the data and generate HTML for each task
    data.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-card');
      taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due Date: ${task.dueDate}</p>
        <p>Completed: ${task.completed ? 'Yes' : 'No'}</p>
        <button class="editBtn" data-id="${task.id}">Edit</button>
        <button class="completeBtn" data-id="${task.id}">Complete</button>
        <button class="deleteBtn" data-id="${task.id}">Delete</button>
      `;
  
      const deleteButton = taskItem.querySelector('.deleteBtn');
      const editButton = taskItem.querySelector('.editBtn');
      const completeBtn = taskItem.querySelector('.completeBtn');
  
      deleteButton.addEventListener('click', () => {
        const taskId = deleteButton.dataset.id;
        handleDeleteRequest(taskId);
      });
  
      editButton.addEventListener('click', () => {
        const taskId = editButton.dataset.id;
        const updatedTask = {
          title: prompt('Enter the new title:', task.title),
          description: prompt('Enter the new description:', task.description),
          dueDate: prompt('Enter the new due date:', task.dueDate),
          completed: task.completed
        };
        handleEditRequest(taskId, updatedTask);
      });
  
      completeBtn.addEventListener('click', () => {
        const taskId = completeBtn.dataset.id;
        handleCompleteRequest(taskId);
      });
  
      taskList.appendChild(taskItem);
    });
  };
  
  // Function to handle fetching and rendering the data
  const handleRenderFetch = () => {
    fetch('http://localhost:3000/tasksData')
      .then(res => res.json())
      .then(data => handleDisplay(data))
      .catch(error => console.error(error));
  };
  
  // Function to handle the POST request
  const handlePostRequest = (task) => {
    fetch('http://localhost:3000/tasksData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(() => {
        // Reset the form fields
        document.querySelector('#titleInput').value = '';
        document.querySelector('#descriptionInput').value = '';
        document.querySelector('#dueDateInput').value = '';
  
        // Refresh the task list by re-rendering the data
        handleRenderFetch();
      })
      .catch(error => console.error(error));
  };
  
  // Function to handle the DELETE request
  const handleDeleteRequest = (taskId) => {
    fetch(`http://localhost:3000/tasksData/${taskId}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Refresh the task list by re-rendering the data
        handleRenderFetch();
      })
      .catch(error => console.error(error));
  };
  
  // Function to handle the PATCH request
  const handleEditRequest = (taskId, updatedTask) => {
    fetch(`http://localhost:3000/tasksData/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
      .then(() => {
        // Refresh the task list by re-rendering the data
        handleRenderFetch();
      })
      .catch(error => console.error(error));
  };
  
  // Function to handle the completion request
  const handleCompleteRequest = (taskId) => {
    fetch(`http://localhost:3000/tasksData/${taskId}`)
      .then((res) => res.json())
      .then((task) => {
        const updatedTask = {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          completed: !task.completed
        };
  
        return fetch(`http://localhost:3000/tasksData/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });
      })
      .then(() => {
        // Refresh the task list by re-rendering the data
        handleRenderFetch();
      })
      .catch((error) => console.error(error));
  };
  
  // Call the handleRenderFetch function initially to display the tasks
  handleRenderFetch();
  