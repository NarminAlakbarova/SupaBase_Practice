import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./helper/supabaseClient";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch todos from Supabase
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo with file
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    console.log("Form submitted with title:", title);
    console.log("Selected file:", selectedFile);

    try {
      setUploading(true);
      let fileUrl = null;
      let fileName = null;

      // 1. Dosya varsa Storage'a yükle
      if (selectedFile) {
        const filePath = `todos/${Date.now()}_${selectedFile.name}`;
        console.log("File path:", filePath);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("todo-files")
          .upload(filePath, selectedFile);

        if (uploadError) {
          console.error("File upload error details:", {
            message: uploadError.message,
            statusCode: uploadError.statusCode,
            error: uploadError.error,
            details: uploadError.details,
          });
          throw uploadError;
        }

        console.log("File uploaded successfully:", uploadData);

        // 2. Public URL al
        const { data: urlData } = supabase.storage
          .from("todo-files")
          .getPublicUrl(filePath);

        fileUrl = urlData.publicUrl;
        fileName = selectedFile.name;
        console.log("File URL:", fileUrl);
      }

      // 3. DB'ye yeni todo ekle
      console.log("Inserting todo to database...");
      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            title: title.trim(),
            completed: false,
            file_url: fileUrl,
            file_name: fileName,
          },
        ])
        .select();

      if (error) {
        console.error("Database insert error:", error);
        throw error;
      }

      console.log("Todo added successfully:", data);
      setTodos([data[0], ...todos]);
      setTitle("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding todo:", error.message);
      alert("Hata: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Dosya boyutu 5MB'dan küçük olmalıdır!");
        return;
      }
      setSelectedFile(file);
    }
  };

  // Remove selected file
  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  // Toggle todo completion
  const toggleTodo = async (id, completed) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !completed })
        .eq("id", id);

      if (error) throw error;

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete todo
  const deleteTodo = async (id, fileUrl) => {
    try {
      if (fileUrl) {
        const fileName = fileUrl.split("/").pop(); // bu sadece "123_myfile.pdf" verir
        await supabase.storage.from("todo-files").remove([`todos/${fileName}`]);
      }

      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        console.log("Testing Supabase connection...");
        console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
        console.log(
          "Supabase Key exists:",
          !!import.meta.env.VITE_SUPABASE_ANON_KEY
        );

        const { data, error } = await supabase
          .from("todos")
          .select("count")
          .limit(1);
        if (error) {
          console.error("Supabase connection error:", error);
        } else {
          console.log("Supabase connection successful");
        }
      } catch (error) {
        console.error("Connection test failed:", error);
      }
    };

    testConnection();
    fetchTodos();
  }, []);

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="app">
      <h1>📝 To Do List</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Yeni görev ekle..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="todo-input"
          />

          <div className="file-upload">
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx,.txt"
              className="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              📎 Dosya Ekle
            </label>
          </div>
        </div>

        {selectedFile && (
          <div className="selected-file">
            <span>📄 {selectedFile.name}</span>
            <button
              type="button"
              onClick={removeSelectedFile}
              className="remove-file-btn"
            >
              ✕
            </button>
          </div>
        )}

        <button type="submit" className="add-button" disabled={uploading}>
          {uploading ? "Yükleniyor..." : "Ekle"}
        </button>
      </form>

      <div className="todos-container">
        <h2>⏳ Tamamlanmamış Görevler ({incompleteTodos.length})</h2>
        <ul className="todos-list">
          {incompleteTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
                className="todo-checkbox"
              />
              <div className="todo-content">
                <span className="todo-text">{todo.title}</span>
                {todo.file_url && (
                  <div className="todo-file">
                    <a
                      href={todo.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      📎 {todo.file_name}
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteTodo(todo.id, todo.file_url)}
                className="delete-button"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>

        <h2>✅ Tamamlanmış Görevler ({completedTodos.length})</h2>
        <ul className="todos-list">
          {completedTodos.map((todo) => (
            <li key={todo.id} className="todo-item completed">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
                className="todo-checkbox"
              />
              <div className="todo-content">
                <span className="todo-text">{todo.title}</span>
                {todo.file_url && (
                  <div className="todo-file">
                    <a
                      href={todo.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      📎 {todo.file_name}
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteTodo(todo.id, todo.file_url)}
                className="delete-button"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
