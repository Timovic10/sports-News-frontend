import { useState } from 'react';
import axios from 'axios';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', imageFile);

      const res = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      imageUrl = res.data.url;
      setUploading(false);
    }

    await axios.post(
      'http://localhost:3001/articles',
      { title, category, content, image: imageUrl },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );

    alert('Article posted!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        className="w-full border p-2"
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full border p-2 h-32"
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="w-full"
      />
      {uploading && <p>Uploading image...</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Post Article</button>
    </form>
  );
};

export default CreateArticle;
