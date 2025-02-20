export async function saveTaskToFile(task) {
    const options = {
      suggestedName: `${task.title}.md`,
      types: [{
        description: 'Markdown Files',
        accept: { 'text/markdown': ['.md'] },
      }],
    };
  
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(task.content);
    await writable.close();
  }
  
  export async function loadTaskFromFile() {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: 'Markdown Files',
        accept: { 'text/markdown': ['.md'] },
      }],
    });
    const file = await fileHandle.getFile();
    const content = await file.text();
    return { title: file.name, content };
  }
