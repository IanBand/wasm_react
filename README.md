following this guide https://brightinventions.pl/blog/using-wasm-with-react/


had to do $ yarn add @babel/plugin-syntax-dynamic-import --dev

and in .babelrc, add 
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}