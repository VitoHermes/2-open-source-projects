// 模拟数据 - 20条待办事项
const mockTodos = [
    {
        id: 1,
        title: "学习JavaScript基础语法",
        description: "掌握变量、函数、循环等基本概念",
        completed: false,
        priority: "high"
    },
    {
        id: 2,
        title: "学习ES6+新特性",
        description: "掌握箭头函数、解构赋值、Promise等",
        completed: true,
        priority: "high"
    },
    {
        id: 3,
        title: "学习DOM操作",
        description: "掌握元素选择、事件处理、DOM操作",
        completed: false,
        priority: "medium"
    },
    {
        id: 4,
        title: "学习异步编程",
        description: "掌握回调函数、Promise、async/await",
        completed: false,
        priority: "high"
    },
    {
        id: 5,
        title: "学习React基础",
        description: "掌握组件、JSX、状态管理",
        completed: false,
        priority: "medium"
    },
    {
        id: 6,
        title: "学习React Hooks",
        description: "掌握useState、useEffect等Hooks",
        completed: false,
        priority: "medium"
    },
    {
        id: 7,
        title: "学习Node.js",
        description: "掌握服务器端JavaScript开发",
        completed: false,
        priority: "low"
    },
    {
        id: 8,
        title: "学习数据库设计",
        description: "掌握SQL和NoSQL数据库基础",
        completed: false,
        priority: "low"
    },
    {
        id: 9,
        title: "学习Git版本控制",
        description: "掌握分支管理、合并、冲突解决",
        completed: true,
        priority: "medium"
    },
    {
        id: 10,
        title: "学习CSS布局",
        description: "掌握Flexbox和Grid布局",
        completed: false,
        priority: "medium"
    },
    {
        id: 11,
        title: "学习响应式设计",
        description: "掌握媒体查询和移动端适配",
        completed: false,
        priority: "low"
    },
    {
        id: 12,
        title: "学习TypeScript",
        description: "掌握类型系统和接口定义",
        completed: false,
        priority: "low"
    },
    {
        id: 13,
        title: "学习测试驱动开发",
        description: "掌握单元测试和集成测试",
        completed: false,
        priority: "low"
    },
    {
        id: 14,
        title: "学习性能优化",
        description: "掌握代码分割、懒加载等技术",
        completed: false,
        priority: "medium"
    },
    {
        id: 15,
        title: "学习安全编程",
        description: "掌握XSS、CSRF等安全防护",
        completed: false,
        priority: "high"
    },
    {
        id: 16,
        title: "学习API设计",
        description: "掌握RESTful API设计原则",
        completed: false,
        priority: "medium"
    },
    {
        id: 17,
        title: "学习微服务架构",
        description: "掌握服务拆分和通信",
        completed: false,
        priority: "low"
    },
    {
        id: 18,
        title: "学习Docker容器化",
        description: "掌握容器部署和管理",
        completed: false,
        priority: "low"
    },
    {
        id: 19,
        title: "学习CI/CD流程",
        description: "掌握自动化部署和测试",
        completed: false,
        priority: "low"
    },
    {
        id: 20,
        title: "学习云服务部署",
        description: "掌握AWS、Azure等云平台使用",
        completed: false,
        priority: "low"
    }
];

// 模拟接口请求 - 使用Promise
const mockApi = {
    // 获取待办事项列表（支持分页和搜索）
    getTodos: (params = {}) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // 模拟网络延迟
                    if (Math.random() > 0.1) { // 90%成功率
                        let filteredTodos = [...mockTodos];
                        
                        // 搜索过滤
                        if (params.search) {
                            const searchTerm = params.search.toLowerCase();
                            filteredTodos = filteredTodos.filter(todo => 
                                todo.title.toLowerCase().includes(searchTerm) ||
                                todo.description.toLowerCase().includes(searchTerm) ||
                                todo.priority.toLowerCase().includes(searchTerm)
                            );
                        }
                        
                        // 状态过滤
                        if (params.status !== undefined) {
                            filteredTodos = filteredTodos.filter(todo => 
                                todo.completed === params.status
                            );
                        }
                        
                        // 优先级过滤
                        if (params.priority) {
                            filteredTodos = filteredTodos.filter(todo => 
                                todo.priority === params.priority
                            );
                        }
                        
                        // 分页处理
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
                            message: "获取待办事项成功"
                        });
                    } else {
                        reject(new Error("网络错误，获取待办事项失败"));
                    }
                } catch (error) {
                    reject(new Error("数据处理错误"));
                }
            }, 800); // 800ms延迟
        });
    },

    // 切换待办事项状态
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
                            message: `任务已${todo.completed ? '完成' : '标记为未完成'}`
                        });
                    } else {
                        reject(new Error("待办事项不存在"));
                    }
                } catch (error) {
                    reject(new Error("更新状态失败"));
                }
            }, 300);
        });
    }
};

// 使用fetch风格的API调用函数
const apiClient = {
    // 模拟fetch的GET请求
    async get(url, params = {}) {
        try {
            if (url === '/api/todos') {
                return await mockApi.getTodos(params);
            } else {
                throw new Error(`未知的API端点: ${url}`);
            }
        } catch (error) {
            throw error;
        }
    },

    // 模拟fetch的PUT请求
    async put(url, data) {
        try {
            if (url.startsWith('/api/todos/')) {
                const id = parseInt(url.split('/').pop());
                if (url.includes('/toggle')) {
                    return await mockApi.toggleTodo(id);
                } else {
                    throw new Error(`未知的操作: ${url}`);
                }
            } else {
                throw new Error(`未知的API端点: ${url}`);
            }
        } catch (error) {
            throw error;
        }
    }
};

// 搜索和过滤功能
let currentSearchParams = {
    search: '',
    status: undefined,
    priority: '',
    page: 1,
    limit: 10
};

// 渲染待办事项列表
function renderTodos(todosData) {
    const todosContainer = document.querySelector(".todos-container");
    if (!todosContainer) return;
    
    const { todos, total, page, limit, totalPages } = todosData;
    
    // 更新总数显示
    const totalElement = document.querySelector(".todos-section h2");
    if (totalElement) {
        totalElement.textContent = `待办事项列表 (共${total}条，第${page}页，每页${limit}条)`;
    }
    
    todosContainer.innerHTML = "";
    
    if (todos.length === 0) {
        todosContainer.innerHTML = `
            <div class="no-results">
                <p>没有找到匹配的待办事项</p>
                <button onclick="clearSearch()" class="btn btn-primary">清除搜索</button>
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
                    ${todo.completed ? '✓ 已完成' : '○ 未完成'}
                </button>
            </div>
        `;
        todosContainer.appendChild(todoItem);
    });
    
    // 渲染分页
    renderPagination(page, totalPages);
}

// 渲染分页控件
function renderPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector(".pagination");
    if (!paginationContainer) return;
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // 上一页按钮
    if (currentPage > 1) {
        paginationHTML += `<button onclick="changePage(${currentPage - 1})" class="btn btn-page">上一页</button>`;
    }
    
    // 页码按钮
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="btn btn-page active">${i}</button>`;
        } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `<button onclick="changePage(${i})" class="btn btn-page">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }
    
    // 下一页按钮
    if (currentPage < totalPages) {
        paginationHTML += `<button onclick="changePage(${currentPage + 1})" class="btn btn-page">下一页</button>`;
    }
    
    paginationHTML += '</div>';
    paginationContainer.innerHTML = paginationHTML;
}

// 切换待办事项状态
async function toggleTodo(id) {
    try {
        const result = await apiClient.put(`/api/todos/${id}/toggle`);
        if (result.success) {
            showMessage(result.message, 'success');
            // 重新加载当前页面数据
            await loadTodos();
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// 搜索待办事项
async function searchTodos() {
    const searchInput = document.getElementById('searchInput');
    const statusSelect = document.getElementById('statusFilter');
    const prioritySelect = document.getElementById('priorityFilter');
    
    currentSearchParams.search = searchInput.value.trim();
    currentSearchParams.status = statusSelect.value === 'all' ? undefined : (statusSelect.value === 'completed');
    currentSearchParams.priority = prioritySelect.value === 'all' ? '' : prioritySelect.value;
    currentSearchParams.page = 1; // 重置到第一页
    
    await loadTodos();
}

// 清除搜索
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

// 改变页码
async function changePage(page) {
    currentSearchParams.page = page;
    await loadTodos();
}

// 改变每页显示数量
async function changeLimit(limit) {
    currentSearchParams.limit = parseInt(limit);
    currentSearchParams.page = 1; // 重置到第一页
    await loadTodos();
}

// 加载待办事项数据
async function loadTodos() {
    try {
        const result = await apiClient.get('/api/todos', currentSearchParams);
        if (result.success) {
            renderTodos(result.data);
        }
    } catch (error) {
        showMessage(`加载失败: ${error.message}`, 'error');
    }
}

// 显示消息提示
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// 初始化应用
async function initApp() {
    try {
        await loadTodos();
        showMessage("应用初始化成功", 'success');
    } catch (error) {
        showMessage(`初始化失败: ${error.message}`, 'error');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);