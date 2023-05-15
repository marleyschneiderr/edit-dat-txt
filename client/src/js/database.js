import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  // database name and version
  const editorDB = await openDB('jate', 1);

  // creating a new transaction that specifies db and data privileges 
  const tx = editorDB.transaction('jate', 'readwrite');

  // open the correct object store
  const store = tx.objectStore('jate');

  // use add - .add() on the store and pass through the content 
  const request = store.put({ id: 1, value: content });

  // confirm correct
  const result = await request;
  console.log('🚀 - data saved to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  
  // show the database and version 
  const editorDB = await openDB('jate', 1);

  // creating a new transaction that specifies db and data privileges 
  const tx = editorDB.transaction('jate', 'readonly');

  // open the correct object store
  const store = tx.objectStore('jate');

  // use all - .getAll() to get all data from the database
  const request = store.getAll();

  // get confirmation to see request
  const result = await request;
  console.log("🚀 - data read from database", result);
  return result.value;
};

initdb();
