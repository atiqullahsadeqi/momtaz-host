# Layout Structure

This project uses Next.js App Router layout groups to manage different page layouts.

## Structure

```
src/app/
├── layout.tsx                    # Root layout (no header/footer)
├── (main)/                       # Main website pages
│   ├── layout.tsx               # Includes Header + Footer
│   ├── page.tsx                 # Homepage
│   ├── about/
│   ├── domains/
│   ├── hosting/
│   └── ...                      # All public pages
├── (auth)/                       # Authentication pages
│   ├── layout.tsx               # No header/footer
│   ├── login/
│   └── signup/
└── (dashboard)/                  # Dashboard pages
    ├── layout.tsx               # No header/footer
    └── dashboard/
```

## Layout Groups Explained

### (main) - Public Pages
- **Includes:** Header + Footer
- **Pages:** Homepage, About, Services, Domains, etc.
- **Purpose:** Standard website pages with full navigation

### (auth) - Authentication Pages
- **Includes:** Nothing (clean layout)
- **Pages:** Login, Signup
- **Purpose:** Focused auth experience without distractions

### (dashboard) - Dashboard Pages
- **Includes:** Nothing (will have custom dashboard layout later)
- **Pages:** Dashboard and future admin pages
- **Purpose:** Separate layout for authenticated user area

## Routes

- `/` → Main layout (with header/footer)
- `/about` → Main layout (with header/footer)
- `/login` → Auth layout (no header/footer)
- `/signup` → Auth layout (no header/footer)
- `/dashboard` → Dashboard layout (no header/footer)

## Benefits

1. **Clean separation** - Each section has its own layout
2. **No conditional logic** - Layouts are determined by folder structure
3. **Easy to maintain** - Add new pages to the appropriate group
4. **Scalable** - Easy to add more layout groups if needed
