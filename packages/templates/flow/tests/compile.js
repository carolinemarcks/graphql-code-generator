const { makeExecutableSchema, schemaToTemplateContext } = require('graphql-codegen-core');
const { compileTemplate } = require('graphql-codegen-compiler');
const config = require('../dist');

const compileAndBuildContext = typeDefs => {
  const schema = makeExecutableSchema({ typeDefs, resolvers: {}, allowUndefinedInResolve: true });

  return {
    schema,
    context: schemaToTemplateContext(schema)
  };
};

const { context } = compileAndBuildContext(`
    type Query {
      test: String
    }

    schema {
      query: Query
    }
  `);

console.log('config', config);

compileTemplate(
  {
    ...config.default,
    config: {
      prepend: ['// Test [="]']
    }
  },
  context
).then(compiled => console.log('compiled', compiled[0]));
