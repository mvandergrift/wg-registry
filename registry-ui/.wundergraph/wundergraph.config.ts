import { configureWunderGraphApplication, cors, introspect, authProviders } from '@wundergraph/sdk';
import { NextJsTemplate } from '@wundergraph/nextjs/dist/template';

import server from './wundergraph.server';
import operations from './wundergraph.operations';

console.log("ENV: ", process.env.COSMO_API_URL, process.env.REGISTRY_API_URL)

const wg = introspect.graphql({
	apiNamespace: 'wg',
	url: process.env.REGISTRY_API_URL ?? 'http://ec2-44-203-187-255.compute-1.amazonaws.com:8081/graphql',
	introspection: {
		headers: (builder) =>			
			builder.addStaticHeader(
				"Authorization",
				`Bearer ${process.env.REGISTRY_INTROSPECTION_TOKEN}`
			)
	}
})

const cs = introspect.graphql({
	apiNamespace: 'cs',
	url: process.env.COSMO_API_URL ?? 'http://ec2-44-203-187-255.compute-1.amazonaws.com:3002/graphql',
})

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
	apis: [wg, cs],
	server,
	operations,
	generate: { 
		codeGenerators: [
			{
				templates: [new NextJsTemplate()],
				path: '../src/components/generated',
			},
		],
	},
	cors: {
		...cors.allowAll,
	},
	authentication: {
		cookieBased: {
			providers: [
				authProviders.auth0({
					id: 'auth0', // unique id for this provider
					issuer: `https://${process.env.AUTH0_DOMAIN ?? ''}/`,
					clientId: process.env.AUTH0_CLIENT_ID ?? '',
					clientSecret: process.env.AUTH0_CLIENT_SECRET ?? ''
				})
			],
			authorizedRedirectUris: ['http://localhost:3000/dashboard', 'https://registry.strategic-dev.com/dashboard'],
		}
	},
	security: {
		enableGraphQLEndpoint: process.env.NODE_ENV !== 'production',
	},
});
