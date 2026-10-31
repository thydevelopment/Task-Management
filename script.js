let id = 1;
let data = [];
let editId = null;

// function get data form
function dataForm() {
    return {
        taskName: document.getElementById('task-name').value,
        priority: document.getElementById('priority').value,
        dueDate: document.getElementById('due-date').value,
        status: document.getElementById('status').value,
    }
}

// function add task
function addTask() {
    const form = dataForm();
    if (!form.taskName) return alert('Please filed task name!')
    data.push({ id: id++, ...form });
    console.log('ListTask:', data);
    resetForm();
    totalTask();
    totalPending();
    totalInProgress();
    totalCompleted();
    renderData();
}

// function reset form
function resetForm() {
    document.getElementById('task-name').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('status').value = '';
    document.getElementById('btn-addTask').style.display = 'inline-block';
    document.getElementById('btn-updateTask').style.display = 'none';
}

// function count task
function totalTask() {
    document.getElementById('total-task').innerHTML = data.length;
}
totalTask();
// function total pending
function totalPending() {
    document.getElementById('total-pending').innerHTML = data.filter(pd => pd.status === 'pending').length;
}
totalPending();
// function total in progress
function totalInProgress() {
    document.getElementById('total-inProgress').innerHTML = data.filter(pd => pd.status === 'in-progress').length;
}
totalInProgress();
// function total complete
function totalCompleted() {
    document.getElementById('total-complete').innerHTML = data.filter(pd => pd.status === 'completed').length;
}
totalCompleted();

// function render data
function renderData() {
    const list = document.getElementById('render-list-data');
    list.innerHTML = data.map(d => `
            <tr class="bg-gray-400 text-slate-700 hover:bg-slate-600 hover:text-white">
                <th class="whitespace-nowrap py-3 px-4 text-left">${d.id}</th>
                <th class="whitespace-nowrap py-3 px-4 text-left">${d.taskName}</th>
                <th class="whitespace-nowrap py-3 px-4 text-left">${d.priority}</th>
                <th class="whitespace-nowrap py-3 px-4 text-left">${d.dueDate}</th>
                <th class="whitespace-nowrap py-3 px-4 text-left">${d.status}</th>
                <th class="whitespace-nowrap py-3 px-4 text-left">
                    <button class="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600" type="button" onclick="editTask(${d.id})">Edit</button>
                    <button class="py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700" type="button" onclick="deleteTask(${d.id})" >Delete</button>
                </th>
            </tr>
        `).join('')
}

// function delete task
function deleteTask(deleteId) {
    if (!confirm('Are you sure want to delete this task?')) return;
    data = data.filter(d => d.id !== deleteId);
    renderData();
}

// function edit task
function editTask(editID) {
    const taskEdit = data.find(d => d.id === editID);
    if(!taskEdit) return alert('Data not found!');
        document.getElementById('task-name').value = taskEdit.taskName;
        document.getElementById('priority').value = taskEdit.priority;
        document.getElementById('due-date').value = taskEdit.dueDate;
        document.getElementById('status').value = taskEdit.status;
    editId = editID;

    document.getElementById('btn-addTask').style.display = 'none';
    document.getElementById('btn-updateTask').style.display = 'inline-block';

}

// function update task 
function updateTask() {
    const taskUpdate = dataForm();
    if(!taskUpdate) return alert('Please filed in data!');
    const idx = data.findIndex(i => i.id === editId);
    if(idx === -1) return alert('Not found data update!');
    data[idx] = {...data[idx], ...taskUpdate}
    renderData();
    resetForm();
    document.getElementById('btn-addTask').style.display = 'inline-block';
    document.getElementById('btn-updateTask').style.display = 'none';
}
