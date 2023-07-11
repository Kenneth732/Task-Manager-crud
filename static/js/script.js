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
  