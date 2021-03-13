export const handlerPath = (context: string) => {
  console.log('context',context);
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`
};
