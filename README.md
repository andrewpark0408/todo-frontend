# Todo Front-End (Next.js + Tailwind + TypeScript)

This is the front-end application for the Todo List App challenge.

## Technologies
- [Next.js (App Router)](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs)
- TypeScript

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/andrewpark0408/todo-frontend.git
   cd todo-frontend

1. **Install dependencies**:
    
    ```
    npm install
    
    ```
    
2. **Run the development server**:
    
    ```
    npm run dev
    
    ```
    
    This starts the Next.js development server on http://localhost:3000.
    
3. **Configure the API endpoint** (if needed):
    - The front-end code currently points to `http://localhost:4000` for the back-end.
    - If your back-end runs on a different host/port, update the fetch URLs accordingly.

## Building for Production

npm run build
npm run start

```

- `npm run build` compiles a production build to the `.next/` folder.
- `npm run start` serves the compiled Next.js application on the port specified in `.env` or defaults to 3000.

## Project Structure

- `app/`
    - `page.tsx` (Home View)
    - `create/page.tsx` (Create Task Page)
    - `edit/[id]/page.tsx` (Edit Task Page)
- `components/` (Optional reusable components like `TaskCard`, `TaskForm`, etc.)
- `public/` (Static assets: icons, images, etc.)
- `styles/`
    - `globals.css` (Tailwind imports + global styles)
- `tailwind.config.js` (Tailwind configuration)

## Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add my feature'`)
4. Push the branch (`git push origin feature/my-feature`)
5. Create a new Pull Request

## License

MIT
