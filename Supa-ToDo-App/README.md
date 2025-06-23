# ✨ SupaToDo App

A beautiful and modern ToDo application built with React and Supabase, featuring real-time data synchronization, file uploads, and a responsive design.

## 🚀 Features

- ✅ Add, complete, and delete todos
- 📎 Upload photos and documents (images, PDFs, docs, txt files)
- 🔄 Real-time data synchronization with Supabase
- 📱 Responsive design for all devices
- 🎨 Modern and beautiful UI
- ⚡ Fast and efficient performance
- 🔒 Secure data storage with file management
- 🗂️ File preview and download links

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Supabase (PostgreSQL + Storage + Real-time)
- **File Storage**: Supabase Storage
- **Styling**: CSS3 with modern design patterns
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd SupaToDo-App
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to **Settings > API**
3. Copy your **Project URL** and **anon public key**

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp env.example .env
```

Then edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up the Database and Storage

In your Supabase dashboard, go to **SQL Editor** and run the SQL from `database-schema.sql`:

```sql
-- Updated todos table with file upload support
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  file_url TEXT,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for demo purposes)
CREATE POLICY "Allow all operations" ON todos
  FOR ALL USING (true);

-- Create storage bucket for todo files
INSERT INTO storage.buckets (id, name, public)
VALUES ('todo-files', 'todo-files', true);

-- Create storage policies for todo files
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'todo-files');

CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'todo-files');

CREATE POLICY "Users can update their own files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'todo-files');

CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (bucket_id = 'todo-files');
```

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📁 Project Structure

```
SupaToDo-App/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── helper/
│   │   └── supabaseClient.js # Supabase client configuration
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── .env                 # Environment variables (create this)
├── env.example          # Environment variables template
├── database-schema.sql  # Database and storage setup
└── package.json         # Dependencies and scripts
```

## 📎 File Upload Features

### Supported File Types

- **Images**: JPG, PNG, GIF, WebP, etc.
- **Documents**: PDF, DOC, DOCX, TXT
- **Size Limit**: 5MB per file

### How to Use

1. Click "📎 Dosya Ekle" button
2. Select your file (photo or document)
3. The file will be uploaded to Supabase Storage
4. File link will be displayed in the todo item
5. Click the file link to view/download the file

### File Management

- Files are automatically deleted when the todo is deleted
- Files are stored securely in Supabase Storage
- Public URLs are generated for easy access

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling

The app uses modern CSS with a beautiful gradient background and card-based design. You can customize the colors and styling in `src/App.css`.

### Features

The main application logic is in `src/App.jsx`. You can easily add new features like:

- Todo categories
- Due dates
- Priority levels
- User authentication
- Real-time collaboration
- File preview thumbnails
- Multiple file uploads

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add your environment variables in Netlify dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
```

Then upload the `dist` folder to your hosting provider.

## 🔒 Security Considerations

- The current setup allows all operations on todos (for demo purposes)
- In production, implement proper authentication using Supabase Auth
- Add Row Level Security policies based on user authentication
- Consider implementing rate limiting for file uploads
- Set up proper CORS policies for file access

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Styled with modern CSS
- Icons from emoji and system fonts

---

Made with ❤️ and ☕
