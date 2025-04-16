import { ID, Query } from 'appwrite';
import { databases } from '../../appwrite';
import { reactive } from 'vue';

export const IDEAS_DATABASE_ID = '<YOUR_DATABASE_ID>'; // Replace with your database ID
export const IDEAS_COLLECTION_ID = '<YOUR_COLLECTION_ID>'; // Replace with your collection ID

export const ideas = reactive({
  current: [],
  async init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(10)]
    );
    this.current = response.documents;
  },
  async add(idea) {
    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      idea
    );
    this.current = [response, ...this.current].slice(0, 10);
  },
  async remove(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    this.current = this.current.filter(idea => idea.$id !== id);
    await this.init(); // Refetch ideas to ensure we have 10 items
  },
});
