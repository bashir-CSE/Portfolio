export async function fetchProjects() {
  try {
    const response = await fetch('projects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export function renderProjects(projects) {
  const projectsGrid = document.querySelector('.projects-grid');
  if (!projectsGrid) {
    console.error('Projects grid not found');
    return;
  }

  projectsGrid.innerHTML = '';

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';

    projectCard.innerHTML = `
      <div class="project-image-container">
        <a href="${project.image}" class="glightbox" data-gallery="projects"
          data-title="${project.title}"
          data-description="${project.description}">
          <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
          <div class="project-overlay">
          </div>
        </a>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
      </div>
    `;

    projectsGrid.appendChild(projectCard);
  });
}

export async function initializeProjects() {
  const projects = await fetchProjects();
  renderProjects(projects);
}
