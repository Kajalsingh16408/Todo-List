          let filter=document.getElementById("filter");
          let container=document.getElementById("container");
          let input=document.getElementById("text");
          let addbtn=document.getElementById("addbtn");
          let tasklist=document.getElementById("tasklist");
          let search=document.getElementById("search");
          let tasks = [];
          
          let counter=document.createElement("p");
          counter.id="counter";
          document.body.appendChild(counter);

          let savedTasks = localStorage.getItem("tasks");

          if(savedTasks){
             tasks = JSON.parse(savedTasks);

             tasks.forEach(function(task){
             createTask(task);
           });
        }

          search.addEventListener("input", function(){
          let value = search.value.toLowerCase();
          let tasks = tasklist.querySelectorAll("div");
          tasks.forEach(task => {
          let text = task.querySelector("p").textContent.toLowerCase();
          task.style.display = text.includes(value) ? "block" : "none";
          });
        });
              
          
          function updateCounter(){
            
            counter.textContent = "Total Tasks: " + tasks.length;
          }
          
          filter.addEventListener("change", function(){
            let tasks = tasklist.querySelectorAll("div");
            tasks.forEach(task => {
            let isCompleted = task.querySelector("p").classList.contains("done");

            if(filter.value === "all"){
              task.style.display = "block";
            } 
            else if(filter.value === "completed" && isCompleted){
              task.style.display = "block";
            } 
            else if(filter.value === "pending" && !isCompleted){
              task.style.display = "block";
            } 
            else {
              task.style.display = "none";
            }
         });
       });
       function createTask(task){
           
            
           let taskDiv = document.createElement("div");
            tasklist.appendChild(taskDiv);

            let completebtn= document.createElement("button");
            completebtn.innerHTML="done"
            taskDiv.appendChild(completebtn);
              
              
            let taskText=document.createElement("p");
            taskText.textContent=task.text;
            if(task.completed){
               taskText.classList.add("done");
               completebtn.textContent = "Pending";
            }
             
            taskDiv.appendChild(taskText);
              
            let editbtn=document.createElement("button");
            editbtn.innerHTML="Edit";
            taskDiv.appendChild(editbtn);
            editbtn.addEventListener("click",function(){
                let newText=prompt("Edit Your Task:",taskText.textContent);
                 if(newText && newText.trim() !== ""){
                taskText.textContent = newText;
                task.text = newText;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                
                }
            });

            let removebtn=document.createElement("button");
            removebtn.innerHTML = "Remove";
            taskDiv.appendChild(removebtn);

            removebtn.addEventListener("click",function(){
                  taskDiv.remove();

                  let index = tasks.indexOf(task);

                  tasks.splice(index,1);

                  localStorage.setItem("tasks", JSON.stringify(tasks));

                   updateCounter();
            }); 
              

              
            completebtn.addEventListener("click",function(){
                  taskText.classList.toggle("done");
                  if(taskText.classList.contains("done")){
                     completebtn.textContent = "Pending";
                  }else{
                      completebtn.textContent = "Done";
                  }
                  task.completed = !task.completed;
                  localStorage.setItem("tasks", JSON.stringify(tasks));
            });
            updateCounter();
       }

          addbtn.addEventListener("click",function(){
            
            
           if(input.value.trim()===""){
                  alert("please enter a task");
                  return;
            }
            
            let task ={
                text:input.value,
                completed: false
            };
            
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            createTask(task);

            input.value = "";
    
          });
