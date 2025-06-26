import { useState } from 'react';
import axios from 'axios';

const AddArticle = () => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    content: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('content', form.content);
    if (image) formData.append('image', image);

    const token = localStorage.getItem('token'); // ✅ from localStorage

    try {
      const res = await axios.post('http://localhost:3001/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ Article created!');
      console.log(res.data);
    } catch (err) {
      console.error('❌ Error posting article:', err.response?.data || err.message);
      alert('❌ Error uploading article');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4">
      <input name="title" onChange={handleChange} placeholder="Title" className="w-full border p-2" required />
      <input name="category" onChange={handleChange} placeholder="Category" className="w-full border p-2" required />
      <textarea name="content" onChange={handleChange} placeholder="Content" className="w-full border p-2" required />
      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post Article</button>
    </form>
  );
};

export default AddArticle;
