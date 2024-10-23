// Elementos del DOM
const fetchEmployeesBtn = document.getElementById('fetchEmployeesBtn');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const employeeNameInput = document.getElementById('employeeName');
const employeeTeamInput = document.getElementById('employeeTeam');
const employeeListDiv = document.getElementById('employeeList');

let employees = JSON.parse(localStorage.getItem('employees')) || [];

// Función para renderizar empleados en el DOM, agrupados por equipo
const renderEmployees = () => {
  employeeListDiv.innerHTML = '';
  
  // Agrupar empleados por equipo
  const teams = employees.reduce((acc, employee) => {
    if (!acc[employee.team]) {
      acc[employee.team] = [];
    }
    acc[employee.team].push(employee);
    return acc;
  }, {});

  // Mostrar los empleados agrupados
  for (const team in teams) {
    const teamDiv = document.createElement('div');
    teamDiv.innerHTML = `<h3>Equipo: ${team}</h3>`;
    
    teams[team].forEach((employee, index) => {
      const empDiv = document.createElement('div');
      empDiv.innerHTML = `
        <p>${employee.name} <button data-index="${index}" data-team="${team}" class="deleteBtn">Dar de baja</button></p>
      `;
      teamDiv.appendChild(empDiv);
    });

    employeeListDiv.appendChild(teamDiv);
  }

  // Agregar event listeners a los botones de eliminar
  document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', deleteEmployee);
  });
};

// Función para agregar un nuevo empleado
const addEmployee = () => {
  const name = employeeNameInput.value.trim();
  const team = employeeTeamInput.value.trim();

  if (!name || !team) {
    Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: 'Por favor, completa ambos campos antes de agregar un empleado'
    });
    return;
  }

  employees.push({ name, team });
  localStorage.setItem('employees', JSON.stringify(employees));
  renderEmployees();

  Swal.fire({
    icon: 'success',
    title: 'Empleado Agregado',
    text: `Se ha agregado a ${name} en el equipo ${team}`
  });

  employeeNameInput.value = '';
  employeeTeamInput.value = '';
};

// Función para eliminar un empleado
const deleteEmployee = (event) => {
  const index = event.target.getAttribute('data-index');
  const team = event.target.getAttribute('data-team');
  
  const employeeName = employees.find((emp, idx) => emp.team === team && idx == index).name;

  employees = employees.filter((emp, idx) => emp.team !== team || idx != index);
  localStorage.setItem('employees', JSON.stringify(employees));
  renderEmployees();

  Swal.fire({
    icon: 'info',
    title: 'Empleado eliminado',
    text: `${employeeName} ha sido eliminado`
  });
};

// Función para obtener empleados aleatorios de la API Random User
const fetchEmployees = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();

    data.results.forEach(user => {
      employees.push({
        name: `${user.name.first} ${user.name.last}`,
        team: 'Customer Support'
      });
    });

    localStorage.setItem('employees', JSON.stringify(employees));
    renderEmployees();

    Swal.fire({
      icon: 'success',
      title: 'Listado de empleados',
      text: 'Se ha cargado el listado correctamente.'
    });
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron obtener empleados'
    });
  }
};

// Event Listeners
fetchEmployeesBtn.addEventListener('click', fetchEmployees);
addEmployeeBtn.addEventListener('click', addEmployee);

// Mostrar empleados almacenados al cargar la página
document.addEventListener('DOMContentLoaded', renderEmployees);
