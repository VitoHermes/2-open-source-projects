// Import mock data
import { mockTodos } from './mock-data.js';

// Mock API requests - using Promise
const mockApi = {
    // Get todo list (supports pagination and search)
    getTodos: (params = {}) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Simulate network delay
                    if (Math.random() > 0.1) { // 90% success rate
                        let filteredTodos = [...mockTodos];

                        // Search filtering
                        if (params.search) {
                            const searchTerm = params.search.toLowerCase();
                            filteredTodos = filteredTodos.filter(todo =>
                                todo.title.toLowerCase().includes(searchTerm) ||
                                todo.description.toLowerCase().includes(searchTerm) ||
                                todo.priority.toLowerCase().includes(searchTerm)
                            );
                        }

                        // Status filtering
                        if (params.status !== undefined) {
                            filteredTodos = filteredTodos.filter(todo =>
                                todo.completed === params.status
                            );
                        }

                        // Priority filtering
                        if (params.priority) {
                            filteredTodos = filteredTodos.filter(todo =>
                                todo.priority === params.priority
                            );
                        }

                        // Pagination processing
                        const page = params.page || 1;
                        const limit = params.limit || 10;
                        const startIndex = (page - 1) * limit;
                        const endIndex = startIndex + limit;
                        const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

                        resolve({
                            success: true,
                            data: {
                                todos: paginatedTodos,
                                total: filteredTodos.length,
                                page: page,
                                limit: limit,
                                totalPages: Math.ceil(filteredTodos.length / limit)
                            },
                            message: "Successfully retrieved todos"
                        });
                    } else {
                        reject(new Error("Network error, failed to get todos"));
                    }
                } catch (error) {
                    reject(new Error("Data processing error"));
                }
            }, 800); // 800ms delay
        });
    },

    // Toggle todo completion status
    toggleTodo: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const todo = mockTodos.find(t => t.id === id);
                    if (todo) {
                        todo.completed = !todo.completed;
                        resolve({
                            success: true,
                            data: todo,
                            message: `Task ${todo.completed ? 'completed' : 'marked as incomplete'}`
                        });
                    } else {
                        reject(new Error("Todo item does not exist"));
                    }
                } catch (error) {
                    reject(new Error("Failed to update status"));
                }
            }, 300);
        });
    }
};

// API client using fetch-style API calls
const apiClient = {
    // Simulate fetch GET request
    async get(url, params = {}) {
        try {
            if (url === '/api/todos') {
                return await mockApi.getTodos(params);
            } else {
                throw new Error(`Unknown API endpoint: ${url}`);
            }
        } catch (error) {
            throw error;
        }
    },

    // Simulate fetch PUT request
    async put(url, data) {
        try {
            if (url.startsWith('/api/todos/')) {
                const id = parseInt(url.split('/').pop());
                if (url.includes('/toggle')) {
                    return await mockApi.toggleTodo(id);
                } else {
                    throw new Error(`Unknown operation: ${url}`);
                }
            } else {
                throw new Error(`Unknown API endpoint: ${url}`);
            }
        } catch (error) {
            throw error;
        }
    }
};

// Search and filter functionality
let currentSearchParams = {
    search: '',
    status: undefined,
    priority: '',
    page: 1,
    limit: 10
};

// Render todo list
function renderTodos(todosData) {
    const todosContainer = document.querySelector(".todos-container");
    if (!todosContainer) return;

    const { todos, total, page, limit, totalPages } = todosData;

    // Update total count display
    const totalElement = document.querySelector(".todos-section h2");
    if (totalElement) {
        totalElement.textContent = `Todo List (Total: ${total} items, Page ${page}, ${limit} items per page)`;
    }

    todosContainer.innerHTML = "";

    if (todos.length === 0) {
        todosContainer.innerHTML = `
            <div class="no-results">
                <p>No matching todos found</p>
                <button onclick="clearSearch()" class="btn btn-primary">Clear Search</button>
            </div>
        `;
        return;
    }

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <div class="todo-header">
                <h3>${todo.title}</h3>
                <span class="priority ${todo.priority}">${todo.priority}</span>
            </div>
            <p>${todo.description}</p>
            <div class="todo-actions">
                <button onclick="toggleTodo(${todo.id})" class="btn ${todo.completed ? 'completed' : ''}">
                    ${todo.completed ? '✓ Completed' : '○ Incomplete'}
                </button>
            </div>
        `;
        todosContainer.appendChild(todoItem);
    });

    // Render pagination
    renderPagination(page, totalPages);
}

// Render pagination controls
function renderPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector(".pagination");
    if (!paginationContainer) return;

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '<div class="pagination-controls">';

    // Previous page button
    if (currentPage > 1) {
        paginationHTML += `<button onclick="changePage(${currentPage - 1})" class="btn btn-page">Previous</button>`;
    }

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="btn btn-page active">${i}</button>`;
        } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `<button onclick="changePage(${i})" class="btn btn-page">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }

    // Next page button
    if (currentPage < totalPages) {
        paginationHTML += `<button onclick="changePage(${currentPage + 1})" class="btn btn-page">Next</button>`;
    }

    paginationHTML += '</div>';
    paginationContainer.innerHTML = paginationHTML;
}

// Toggle todo completion status
async function toggleTodo(id) {
    try {
        const result = await apiClient.put(`/api/todos/${id}/toggle`);
        if (result.success) {
            showMessage(result.message, 'success');
            // Reload current page data
            await loadTodos();
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Search todos
async function searchTodos() {
    const searchInput = document.getElementById('searchInput');
    const statusSelect = document.getElementById('statusFilter');
    const prioritySelect = document.getElementById('priorityFilter');

    currentSearchParams.search = searchInput.value.trim();
    currentSearchParams.status = statusSelect.value === 'all' ? undefined : (statusSelect.value === 'completed');
    currentSearchParams.priority = prioritySelect.value === 'all' ? '' : prioritySelect.value;
    currentSearchParams.page = 1; // Reset to first page

    await loadTodos();
}

// Clear search
async function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const statusSelect = document.getElementById('statusFilter');
    const prioritySelect = document.getElementById('priorityFilter');

    searchInput.value = '';
    statusSelect.value = 'all';
    prioritySelect.value = 'all';

    currentSearchParams = {
        search: '',
        status: undefined,
        priority: '',
        page: 1,
        limit: 10
    };

    await loadTodos();
}

// Change page number
async function changePage(page) {
    currentSearchParams.page = page;
    await loadTodos();
}

// Change items per page
async function changeLimit(limit) {
    currentSearchParams.limit = parseInt(limit);
    currentSearchParams.page = 1; // Reset to first page
    await loadTodos();
}

// Load todo data
async function loadTodos() {
    try {
        const result = await apiClient.get('/api/todos', currentSearchParams);
        if (result.success) {
            renderTodos(result.data);
        }
    } catch (error) {
        showMessage(`Loading failed: ${error.message}`, 'error');
    }
}

// Show message notification
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Initialize application
async function initApp() {
    try {
        await loadTodos();
        showMessage("Application initialized successfully", 'success');
    } catch (error) {
        showMessage(`Initialization failed: ${error.message}`, 'error');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initApp);