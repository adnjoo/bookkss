export const downloadMarkdown = (title: string, body: string) => {
  const content = `# ${title}\n\n${body}`;
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.md`;
  link.click();
};
