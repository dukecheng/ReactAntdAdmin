import { Dashboard } from "@/views";

export const routes = [
	{ path: '/dashboard', component: Dashboard },
	{ path: '/func', component: Dashboard },
	// { path: '/permission/toggle', component: Toggle, permission: 1 },
	// { path: '/permission/intercept', component: Intercept },
	// { path: '/error/404', component: Error404 },
	// { path: '/error/500', component: Error500 },
	{ path: '/func2/basic', component: Dashboard },
	{ path: '/func2/normal', component: Dashboard },
	{ path: '/sub1', component: Dashboard },
	{ path: '/sub2', component: Dashboard }
];
