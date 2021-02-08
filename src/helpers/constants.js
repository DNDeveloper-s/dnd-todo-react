export const constants = {
	ITEM_HEIGHT: 45,
	AS_SIBLING: "sibling",
	AS_CHILD: "child",
	SEPARATOR: '-',
	SCAFFOLD_WIDTH: 16,
	DRAG_FROM: {
		COMPLETED: 'completed',
		MAIN: "main",
		DETAIL: 'detail',
		ITEM: "item"
	},
	ITEM_TYPES: {
		TASK: "task",
		ITEM: "item"
	},
	TASK_FILTER: {
		COMPLETE: "complete",
		INCOMPLETE: "incomplete",
		ALL: "all"
	},
	UI_CONSTANTS: {
		TASK_ITEM_HEIGHT: 50
	},
	ROUTES: {
		LOGIN: '/login',
		SIGNUP: '/signup'
	},
	// BASE_URL: 'http://192.168.1.8:5000',
	BASE_URL: 'http://localhost:5000',
	ENDPOINTS: {
		LOGIN: '/auth/login',
		SIGNUP: '/auth/signup',
    GET_CURRENT_USER: '/api/current-user',
    VALIDATE_TOKEN: '/api/validate-token',
		USER_SEARCH: '/api/user-search',
		GET_NOTIFICATIONS: '/api/notifications',
		UPDATE_NOTIFICATION_STATE: '/api/update-notification-status',
		GET_TASK: '/task/get',
		CREATE_TASK: '/task/create',
		UPDATE_TASK: '/task/update',
		DROP_TASK: '/task/drop',
		DROP_TASK_ITEM: '/task/drop-task-item',
		CREATE_TASK_ITEM: '/task/create-task-item',
		UPDATE_TASK_ITEM: '/task/update-task-item',
		GET_APP_DATA: '/api/user-app-data',
		GET_PROJECT: '/project/project',
		CREATE_PROJECT: '/project/create',
		UPDATE_PROJECT: '/project/update',
		DELETE_PROJECT: '/project/delete',
		INVITE_COLLABORATOR: '/project/invite-collaborator',
		RESPOND_INVITE_PROJECT: '/project/respond-invite',
		POST_APP_GLOBAL_DATA: '/api/app-global-data',
		CREATE_LABEL: '/label/create',
		UPDATE_LABEL: '/label/update',
	}
};
