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
  
