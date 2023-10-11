import { configureWunderGraphServer } from '@wundergraph/sdk/server';

export default configureWunderGraphServer(() => ({
	hooks: {
		queries: {},
		mutations: {},
		global: {			
			httpTransport: {
				onOriginRequest: {					
					// Send the user's access token to the origin
					enableForAllOperations: true,
					hook: async ({ request, user }) => {						
						if (user && user.rawIdToken) {
							request.headers.set('Authorization', `Bearer ${user.rawIdToken}`);
						}						
						return request;
					},
				},
			},
		},

	},
}));
